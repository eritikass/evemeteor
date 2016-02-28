/**
 * publish current user api keys
 *
 * Created by eritikass on 24/02/16.
 */

Meteor.publish('user_apikeys', function(){
    if (!this.userId) {
        return;
    }
    var groupIds = [];
    Apikeys_groups.find({members: {$in: [this.userId]}}).forEach(function(group) {
        groupIds.push(group._id);
    });

    var query = {$and: [
        { $or :[ {userID:this.userId}, { group: { $in: groupIds } } ]},
        { $nor: [ {state: 'user_removed'} ] }
    ]};

    return Apikeys.find(query);
});
