/**
 * Created by eritikass on 28/02/16.
 */


Meteor.methods({
    /**
     * remove apikey
     *
     * @param {string} mongoId
     */
    'remove_apikey': function(mongoId) {
        check(mongoId, String);

        if (!Meteor.userId()) {
            throw 'user not logged in';
        }

        var key = Apikeys.findOne({'_id': mongoId, 'userID': Meteor.userId()});

        if (!key) {
            throw 'key not yours, sorry you cant delete it';
        }

        return APIHELPERS.remove_apikey(key._id);

    }
});