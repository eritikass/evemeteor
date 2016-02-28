/**
 * Created by eritikass on 24/02/16.
 */

Meteor.publish('user_towers', function(){
    if (!this.userId) {
        return;
    }
    var key_ids = [];

    APIHELPERS.get_user_keys(this.userId, {"state": "ok", "type": "Corporation"}).forEach(function(key) {
        console.log(key._id);
        key_ids.push(key._id);
    });

    if (key_ids.length == 0) {
        return;
    }

    return Towers.find({key_id: {$in: key_ids}});
});
