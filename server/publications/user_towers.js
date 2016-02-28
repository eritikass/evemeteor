/**
 * Created by eritikass on 24/02/16.
 */

Meteor.publish('user_towers', function(){
    if (!this.userId) {
        return;
    }
    var corpIds = [];

    APIHELPERS.get_user_keys(this.userId, {"state": "ok", "type": "Corporation"}).forEach(function(key) {
        corpIds.push(key.corporationID);
    });

    if (corpIds.length == 0) {
        return;
    }

    return Towers.find({corporationID: {$in: _.uniq(corpIds)}});
});
