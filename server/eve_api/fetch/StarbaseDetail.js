/**
 * Created by eritikass on 26/02/16.
 */


APIHELPERS.fetch_StarbaseDetail = function (mongoId) {

    APIHELPERS.debug('APIHELPERS.fetch_StarbaseDetail: ' + mongoId);

    var tower = Towers.findOne(mongoId);

    if (!tower) {
        return;
    }

    var pos = POS_DATA[tower.typeID];

    if (!pos) {
        Towers.update(tower._id, {$set: {errTypeID: new Date()}});
        return;
    }

    var key = Apikeys.findOne(tower.key_id);

    if (!key) {
        APIHELPERS.debug('APIHELPERS.fetch_StarbaseDetail-ERR: ' + mongoId + ';  KEY NOT FOUND ' + tower.key_id);
        Towers.update({key_id: tower.key_id}, {$set: {state: 'deleted'}});
        return;
    }

    var eveonlinejs = APIHELPERS.getEveApi();

    var args = {
        keyID: key.keyid,
        vCode: key.vcode,
        itemID: tower.itemID,
    };

    eveonlinejs.fetch('corp:StarbaseDetail', args, Meteor.bindEnvironment(function (err, result) {

        if (err) {
            Towers.update(tower._id, {$set: {
                state: 'apierr',
                state_date: new Date(),
                fuelLeftUntil: null,
            }});
            APIHELPERS.debug('APIHELPERS.fetch_StarbaseDetail-APIERR: ' + mongoId + '; ', err);
            return;
        }

        var fuel = {};
        _.forEach(result.fuel, function(fuelItem) {
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

        APIHELPERS.debug('APIHELPERS.fetch_StarbaseDetail: ' + mongoId + '; fuel: ', fuel);

        var fuelLeftUntil = null;

        if (fuel.quantity) {
            var fuelHLeft = parseInt(fuel.quantity / pos.fuel.hour, 10);
            var fuelUntil_unix_ms = (new Date()).getTime() + (60 * 60 * fuelHLeft * 1000);
            var fuelLeftUntil = new Date(fuelUntil_unix_ms);
        }

        Towers.update(tower._id, {$set: {
            state: 'ok',
            state_date: new Date(),
            fuel: fuel,
            fuelLeftUntil: fuelLeftUntil,
            api_currentTime: APIHELPERS.evedate(result.currentTime),
            api_cachedUntil: APIHELPERS.evedate(result.cachedUntil),
        }});


    }));

}