/**
 * Created by eritikass on 27/02/16.
 */


Meteor.publish('user_apikeys_groups', function(){
    if (!this.userId) {
        return;
    }

    return Apikeys_groups.find({members: {$in: [this.userId]}});
});
