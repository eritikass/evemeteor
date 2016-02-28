/**
 * Created by eritikass on 27/02/16.
 */

/**
 * Created by eritikass on 24/02/16.
 */


Template.apikey_group.helpers({
    getMyApiGroups: function() {
        Meteor.subscribe('user_apikeys_groups');
        return Apikeys_groups.find({"ownerId": Meteor.userId()});
    },
    getGroupMembers: function(data) {
        return _.values(this.memberdata);
    }
});

Template.apikey_group.events({
    'submit form': function (event) {
        event.preventDefault();
    },
    'click .add-user': function(event) {
        var $this = $(event.target);
        var $input = $this.closest('.input-group').find('input[type=text]')
        var username = $input.val();

        if (username) {
            Meteor.call('api_group_member', this._id, username, 'add', function(err, res) {
                console.log(err, res);
            });
        }

        $input.val('');
    },
    'click .remove-from-group': function(event) {
        var groupId = $(event.target).closest('.apikeygroup').data('groupid');
        var eveChar = this.eveOnlineCharacterName;
        Meteor.call('api_group_member', groupId, eveChar, 'remove', function(err, res) {
            console.log(err, res);
        });
    }
});


Template.apikey_group.onRendered(function () {
    var validator = $('.eve_api_key_add_group').validate({
        submitHandler: function (event) {
            var $name = $('[name=eve_api_addgroup]');
            var name = $name.val();

            Meteor.call('add_api_group', name, function (err, res) {
                if (err || !res) {
                    //$name.val(name);

                    validator.showErrors({
                        eve_api_addgroup: "Unknown error when adding new api key group, please try again!"
                    });
                    return;
                }
            });
            $name.val('');

        }
    });

});