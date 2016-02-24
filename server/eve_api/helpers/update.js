/**
 * Created by eritikass on 24/02/16.
 */

APIHELPERS.update = function() {

    var eveonlinejs = Meteor.npmRequire('eveonlinejs');
/*
    var query = {
        $or: [
            {'state': 'new'},
            {'state': 'new'}
        ]
    };
*/
    Apikeys.find({'state': 'new'}, {limit: 10}).forEach(function(key) {
        try {
            var init_state = key.state;

            if (init_state == 'process') {
                return;
            }

            Apikeys.update(key._id, {$set: {
                state: 'process',
                updated: new Date(),
            }});

            var args = {
                keyID: key.keyid,
                vCode: key.vcode,
            };

            eveonlinejs.fetch('account:APIKeyInfo', args, Meteor.bindEnvironment(function (err, result) {
                if (err) {
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
                }});

                if ((init_state == 'new') && (result.type == 'Corporation')) {
                    APIHELPERS.update_towers(key._id);
                }
                if ((init_state == 'new') && (result.type == 'Account')) {
                    APIHELPERS.update_characters(key._id);
                }


            }));


        } catch (e) {
            Apikeys.update(key._id, {$set: {
                state: 'errj1',
                updated: new Date(),
            }});
        }

    });

}