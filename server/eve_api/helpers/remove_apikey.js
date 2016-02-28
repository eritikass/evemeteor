/**
 * Created by eritikass on 28/02/16.
 */

/**
 * remove apikey
 *
 * @param {string} mongoID
 * @returns {boolean}
 */
APIHELPERS.remove_apikey = function(mongoID) {
    return Apikeys.update({'_id': mongoID}, {$set: {
        'state': 'user_removed',
        'user_removed': new Date(),
    }});
}