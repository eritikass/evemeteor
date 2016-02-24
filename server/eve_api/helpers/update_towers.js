/**
 * Created by eritikass on 24/02/16.
 */


APIHELPERS.update_towers = function(api_id) {

    var eveonlinejs = Meteor.npmRequire('eveonlinejs');
    var transliteration = Meteor.npmRequire('transliteration');

    var key = Apikeys.findOne(api_id);
    if (!key || key.type != 'Corporation') { //  || key.state != 'ok'
        return;
    }

    var args = {
        keyID: key.keyid,
        vCode: key.vcode,
    };

    Towers.update({key_id: key._id}, {$set: {state: 'deleted'}});

    eveonlinejs.fetch('corp:StarbaseList', args, Meteor.bindEnvironment(function (err, result) {
        if (err) { return; }


        for (var posId in result.starbases) {
            var tower = result.starbases[posId];

            tower.key_id_eve = key.keyid;
            tower.key_id = key._id;

            tower.itemID = parseInt(tower.itemID, 10);
            tower.typeID = parseInt(tower.typeID, 10);
            tower.locationID = parseInt(tower.locationID, 10);
            tower.moonID = parseInt(tower.moonID, 10);
            tower.state_api = parseInt(tower.state, 10);

            tower.state = 'ok';


            tower.stateTimestamp = APIHELPERS.evedate(tower.stateTimestamp);
            tower.onlineTimestamp = APIHELPERS.evedate(tower.onlineTimestamp);

            var dbTower = Towers.findOne({itemID: tower.itemID});
            if (!dbTower) {
                Towers.insert(tower);
                dbTower = Towers.findOne({itemID: tower.itemID});
            }
            Towers.update(dbTower._id, {$set: tower});

            if (!dbTower.moonName) {

                //FIXE: use something else than this remove service for moon data!
                var urlMoonJson = 'http://eve.kassikas.net/json/moonjson.php?extended=1&moonIDs=' + tower.moonID;
                var res = HTTP.call('GET', urlMoonJson, {timeout: 5000, params: {}});

                _.forEach(JSON.parse(res.content), function(moon, index) {
                    moon.moonID = parseInt(moon.moonID, 10);
                    if (moon.moonID != tower.moonID) {
                        return;
                    }

                    var moon2db = {
                        moonName: moon.moonName,
                        moonNameTranslit: transliteration.slugify(moon.moonName, {lowercase: false, separator: '_'}),
                        systemID: parseInt(moon.systemID, 10),
                        systemName: moon.systemName,
                        regionID: parseInt(moon.regionID, 10),
                        regionName: moon.regionName,
                        celdata: {
                            planet: parseInt(moon.planet, 10),
                            moon: parseInt(moon.moon, 10),
                            x: parseInt(moon.x, 10),
                            y: parseInt(moon.y, 10),
                            z: parseInt(moon.z, 10),
                        }
                    };

                    Towers.update(dbTower._id, {$set: moon2db});
                });

            }


            var pos = POS_DATA[tower.typeID];

            if (!pos) {
                Towers.update(dbTower._id, {$set: {errTypeID: new Date()}});
                return;
            }

            args.itemID = tower.itemID;
            eveonlinejs.fetch('corp:StarbaseDetail', args, Meteor.bindEnvironment(function (err2, result2) {
                if (err2) {
                    return;
                }

                var fuel = {};
                _.forEach(result2.fuel, function(fuelItem) {
                    fuelItem.typeID = parseInt(fuelItem.typeID, 10);
                    fuelItem.quantity = parseInt(fuelItem.quantity, 10);

                    if (fuelItem.typeID == 16275) {
                        // Strontium Clathrates
                        fuel.stront = fuelItem.quantity;
                    }

                    if (fuelItem.typeID == pos.fuel.typeID) {
                        // fuelblocks
                        fuel.quantity = fuelItem.quantity;
                    }
                });

                var fuelLeftUntil = null;

                if (fuel.quantity) {
                    var fuelHLeft = parseInt(fuel.quantity / pos.fuel.hour, 10);
                    var fuelUntil_unix_ms = (new Date()).getTime() + (60 * 60 * fuelHLeft * 1000);
                    var fuelLeftUntil = new Date(fuelUntil_unix_ms);
                }

                Towers.update(dbTower._id, {$set: {
                    fuel: fuel,
                    fuelLeftUntil: fuelLeftUntil,
                }});


            }));


        }

    }));


}