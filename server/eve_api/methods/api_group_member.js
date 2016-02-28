/**
 * Created by eritikass on 28/02/16.
 */


Meteor.methods({
    /**
     * add new apikeys group
     *
     * @param {string} groupId
     * @param {string} user
     * @param {string} action
     */
    'api_group_member': function(groupId, user, action) {
        check(groupId, String);
        check(user, String);
        check(action, String);

        if (!Meteor.userId()) {
            throw 'user not logged in';
        }

        var usr = Meteor.users.findOne(user);
        if (!usr) {
            usr = Meteor.users.findOne({"profile.eveOnlineCharacterName": user});
            if (!usr) {
                throw 'did not found user';
            }
        }

        var group = Apikeys_groups.findOne(groupId);
        if (!group || group.ownerId != Meteor.userId()) {
            throw 'sorry you cant edit this group';
        }

        return APIHELPERS.api_group_member(group._id, usr._id, action);

    }
});