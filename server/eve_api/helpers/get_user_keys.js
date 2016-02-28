/**
 * Created by eritikass on 28/02/16.
 */


APIHELPERS.get_user_keys = function(userId, extras) {

    var groupIds = [];
    Apikeys_groups.find({members: {$in: [userId]}}).forEach(function(group) {
        groupIds.push(group._id);
    });

    var query = { $or :[ {userID: userId}, { group: { $in: groupIds } } ]};
    if(extras) {
        query = {$and: [query, extras]};
    }

    return Apikeys.find(query);

}