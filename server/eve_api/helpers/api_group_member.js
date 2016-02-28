/**
 * Created by eritikass on 27/02/16.
 */


/**
 * add/remove member from api key access group
 *
 * @param {string} groupId
 * @param {string} userId
 * @param {string} add
 * @returns {string}
 */
APIHELPERS.api_group_member = function(groupId, userId, action) {

    var group = Apikeys_groups.findOne(groupId);
    var user = Meteor.users.findOne(userId);

    if (!group || !user) {
        return false;
    }

    var members = group.members || [];
    var memberdata = group.memberdata || {};

    var m_index = members.indexOf(user._id);

    if (action && action == 'remove') {
        if (m_index != -1) {
            members.splice(m_index, 1);
        }
        if (memberdata[user._id]) {
            delete memberdata[user._id];
        }
    } else {
        if (m_index == -1) {
            members.push(user._id);
        }

        memberdata[user._id] = {
            userId: user._id,
            eveOnlineCharacterId: user.profile.eveOnlineCharacterId,
            eveOnlineCharacterName: user.profile.eveOnlineCharacterName
        }
    }

    Apikeys_groups.update(group._id, {$set: {
        members: members,
        memberdata: memberdata,
        updated: new Date()
    }});

    return group._id;
}
