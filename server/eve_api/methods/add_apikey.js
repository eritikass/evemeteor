/**
 * Created by eritikass on 24/02/16.
 */


Meteor.methods({
    /**
     * add new apikey
     *
     * @param {number} keyid
     * @param {string} vcode
     * @param {string} name
     * @param {string} group
     */
    'add_apikey': function(keyid, vcode, name, group) {
        check(keyid, Number);
        check(vcode, String);
        check(name, String);
        check(group, String);


        if (!Meteor.userId()) {
            throw 'user not logged in';
        }

        return APIHELPERS.add_apikey(Meteor.userId(), keyid, vcode, name, group);

    }
});