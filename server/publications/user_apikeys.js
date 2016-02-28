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

    return Apikeys.find({ $or :[ {userID:this.userId}, { group: { $in: groupIds } } ]});
});
