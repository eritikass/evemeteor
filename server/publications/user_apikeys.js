/**
 * publish current user api keys
 *
 * Created by eritikass on 24/02/16.
 */

Meteor.publish('user_apikeys', function(){
    if (!this.userId) {
        return;
    }
    return Apikeys.find({ userID: this.userId });
});
