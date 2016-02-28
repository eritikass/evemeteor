/**
 * Created by eritikass on 26/02/16.
 */

APIHELPERS.fetch_APIKeyInfo = function(mongoId) {

    APIHELPERS.debug('APIHELPERS.fetch_APIKeyInfo: ' + mongoId);

    var key = APIHELPERS.getApiKey(mongoId, true);
    if (!key || (key.state == 'process')) {
        return;
    }

    Apikeys.update(key._id, {$set: {
        state: 'process',
        updated: new Date(),
    }});


    try {

        var eveonlinejs = APIHELPERS.getEveApi();

        var args = {
            keyID: key.keyid,
            vCode: key.vcode,
        };

        eveonlinejs.fetch('account:APIKeyInfo', args, Meteor.bindEnvironment(function (err, result) {
            if (err) {
                APIHELPERS.debug('APIHELPERS.fetch_APIKeyInfo-APIERR(code:' + err.code + '): ' + mongoId);
                Apikeys.update(key._id, {$set: {
                    state: 'errapi',
                    updated: new Date(),
                    errCode: err.code
                }});
                return;
            }



            var charIds = [];
            var info = '';
            for (var charId in result.characters) {
                var char = result.characters[charId];

                char.characterID = parseInt(char.characterID, 10);
                char.corporationID = parseInt(char.corporationID, 10);
                char.allianceID = parseInt(char.allianceID, 10);
                char.factionID = parseInt(char.factionID, 10);

                charIds.push(char.characterID);

                if (result.type == "Corporation") {
                    info = char.corporationName + ' / ' + char.characterName;

                    Apikeys.update(key._id, {$set: {
                        'corpName': char.corporationName,
                        'corporationID': char.corporationID,
                    }});

                } else {
                    info += (info?', ':'') + char.characterName;
                }

                var dbChar = Characters.findOne({characterID: char.characterID});
                if (dbChar) {
                    Characters.update(dbChar._id, {$set: char});
                } else {
                    var _id = Characters.insert(char);
                }
            }

            Apikeys.update(key._id, {$set: {
                state: 'ok',
                type: result.type,
                accessMask: result.accessMask,
                expires: APIHELPERS.evedate(result.expires),
                updated: new Date(),
                characters: charIds,
                info: info,
                api_currentTime: APIHELPERS.evedate(result.currentTime),
                api_cachedUntil: APIHELPERS.evedate(result.cachedUntil),
            }});

            APIHELPERS.debug('APIHELPERS.fetch_APIKeyInfo-OK: ' + mongoId + ' #(' + key.state + ') ' + result.type);

            if ((result.type == 'Corporation')) {
                // fetch starbase list
                var starbase = key.StarbaseList && key.StarbaseList.api_cachedUntil;
                if (!starbase || starbase < moment().subtract(30, 'minute').toDate()) {
                    APIHELPERS.fetch_StarbaseList(key._id);
                }
            }

            // if its first time ever, fetch some inital data
            if ((key.state == 'new') && (result.type == 'Account')) {
                //APIHELPERS.update_characters(key._id);
            }

        }));


    } catch (e) {
        console.log(e);
        APIHELPERS.debug('APIHELPERS.fetch_APIKeyInfo-JSERROR: ' + mongoId);
        Apikeys.update(key._id, {$set: {
            state: 'errj1',
            updated: new Date(),
        }});
    }

};