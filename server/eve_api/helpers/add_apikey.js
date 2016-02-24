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
APIHELPERS.add_apikey = function(userID, keyid, vcode) {
    return Apikeys.insert({
        'userID': userID,
        'keyid': keyid,
        'vcode': vcode,
        'state': 'new',
    });
}