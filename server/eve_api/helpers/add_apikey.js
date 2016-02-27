/**
 * Created by eritikass on 24/02/16.
 */

/**
 * add apikey
 *
 * @param {string} userID
 * @param {number} keyid
 * @param {string} vcode
 * @returns {string}
 */
APIHELPERS.add_apikey = function(userID, keyid, vcode, name) {
    return Apikeys.insert({
        'userID': userID,
        'keyid': keyid,
        'vcode': vcode,
        'keyName': name,
        'state': 'new',
        'created': new Date(),
    });
}