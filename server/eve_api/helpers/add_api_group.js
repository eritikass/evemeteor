/**
 * Created by eritikass on 27/02/16.
 */


/**
 * add new apikey group
 *
 * @param {string} name
 * @returns {string}
 */
APIHELPERS.add_api_group = function(userID, name) {

    if (!name) {
        return;
    }

    var groupId = Apikeys_groups.insert({
        'ownerId': userID,
        'name': name,
        'state': 'ok',
        'created': new Date()
    });

    APIHELPERS.api_group_member(groupId, userID, 'add');

    return groupId;

}

