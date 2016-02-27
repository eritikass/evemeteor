/**
 * Created by eritikass on 26/02/16.
 */

APIHELPERS.fetch_StarbaseList = function(mongoId) {

    var key = APIHELPERS.getApiKey(mongoId);

    APIHELPERS.debug('APIHELPERS.fetch_StarbaseList: ' + mongoId + ';  ' + (key ? key.type + '|' + key.state  : '' ) );

    if (!key || key.type != 'Corporation'|| key.state != 'ok') {
        return;
    }

    try {

        var eveonlinejs = APIHELPERS.getEveApi();
        var transliteration = Meteor.npmRequire('transliteration');

        var args = {
            keyID: key.keyid,
            vCode: key.vcode,
        };

        Towers.update({key_id: key._id}, {$set: {state: 'deleted'}});

        eveonlinejs.fetch('corp:StarbaseList', args, Meteor.bindEnvironment(function (err, result) {
            if (err) {
                APIHELPERS.debug('APIHELPERS.fetch_StarbaseList-APIERR: ' + mongoId + ';  ' + err);
                return;
            }

            APIHELPERS.debug('APIHELPERS.fetch_StarbaseList: ' + mongoId + '; tower-count: ' + Object.keys(result.starbases).length);


            Apikeys.update(key._id, {$set: {
                StarbaseList: {
                    api_currentTime: APIHELPERS.evedate(result.currentTime),
                    api_cachedUntil: APIHELPERS.evedate(result.cachedUntil),
                }
            }});

            for (var posId in result.starbases) {
                var tower = result.starbases[posId];

                tower.key_id_eve = key.keyid;
                tower.key_id = key._id;

                tower.itemID = parseInt(tower.itemID, 10);
                tower.typeID = parseInt(tower.typeID, 10);
                tower.locationID = parseInt(tower.locationID, 10);
                tower.moonID = parseInt(tower.moonID, 10);
                tower.state_api = parseInt(tower.state, 10);

                tower.corpName = key.corpName;

                tower.state = 'ok';
                tower.state_date = new Date();


                tower.stateTimestamp = APIHELPERS.evedate(tower.stateTimestamp);
                tower.onlineTimestamp = APIHELPERS.evedate(tower.onlineTimestamp);

                var dbTower = Towers.findOne({itemID: tower.itemID});
                if (!dbTower) {
                    Towers.insert(tower);
                    tower = Towers.findOne({itemID: tower.itemID});
                } else {
                    Towers.update(dbTower._id, {$set: tower});
                }

                if (!dbTower || !dbTower.moonName) {

                    APIHELPERS.debug('APIHELPERS.fetch_StarbaseList-MOONJSON(' + tower.moonID + '): ' + mongoId);

                    //FIXE: use something else than this remove service for moon data!
                    var urlMoonJson = 'http://eve.kassikas.net/json/moonjson.php?extended=1&moonIDs=' + tower.moonID;
                    var res = HTTP.call('GET', urlMoonJson, {timeout: 5000, params: {}});

                    _.forEach(JSON.parse(res.content), function(moon, index) {
                        moon.moonID = parseInt(moon.moonID, 10);
                        if (moon.moonID != tower.moonID) {
                            return;
                        }

                        APIHELPERS.debug('APIHELPERS.fetch_StarbaseList-MOONJSON(' + tower.moonID + ')-FOUND: ' + mongoId + ';  ' + moon.moonName);

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

                        Towers.update(tower._id, {$set: moon2db});
                    });

                }


            }

        }));

    } catch (e) {
        console.log(e);
    }

}