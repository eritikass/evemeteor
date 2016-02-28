/**
 * Created by eritikass on 27/02/16.
 */


Meteor.methods({
    /**
     * add new apikeys group
     *
     * @param {string} name
     */
    'add_api_group': function(name) {
        check(name, String);

        if (!Meteor.userId()) {
            throw 'user not logged in';
        }

        return APIHELPERS.add_api_group(Meteor.userId(), name);

    }
});