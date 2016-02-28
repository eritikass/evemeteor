/**
 * Created by eritikass on 24/02/16.
 */

/**
 * add apikey
 *
 * @param {string} userID
 * @param {number} keyid
 * @param {string} vcode
 * @param {string} name
 * @param {string} groupId
 * @returns {string}
 */
APIHELPERS.add_apikey = function(userID, keyid, vcode, name, groupId) {
    if (groupId) {
        var group = Apikeys_groups.findOne({ _id: groupId, members: { $in: [userID]} });
        groupId = group && group._id || null;
    }

    return Apikeys.insert({
        'userID': userID,
        'group': groupId || null,
        'keyid': keyid,
        'vcode': vcode,
        'keyName': name,
        'state': 'new',
        'created': new Date(),
    });
}