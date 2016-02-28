/**
 * Created by eritikass on 24/02/16.
 */


Template.apikey_add.helpers({
    getApiGroups: function() {
        Meteor.subscribe('user_apikeys_groups');
        return Apikeys_groups.find({});
    }
});

Template.apikey_add.events({
    'submit form': function (event) {
        event.preventDefault();
    }
});


Template.apikey_add.onRendered(function () {
    var validator = $('.new_eve_api_key').validate({
        submitHandler: function (event) {
            var $key_id = $('[name=eve_api_key_id]');
            var $v_code = $('[name=eve_api_v_code]');
            var $name = $('[name=eve_api_name]');
            var $group = $('[name=eve_apikey_access_group]');


            var key_id = parseInt($key_id.val(), 10);
            var v_code = $v_code.val();
            var name = $name.val();
            var group = $group.val();

            Meteor.call('add_apikey', key_id, v_code, name, group, function (err, res) {
                if (err || !res) {
                    //$key_id.val(key_id);
                    //$v_code.val(v_code);
                    //$name.val(name);

                    validator.showErrors({
                        eve_api_key_id: "Unknown error when adding api key, please try again!"
                    });
                    return;
                }
                Router.go('apikeys');
            });

            $key_id.val('');
            $v_code.val('');
            $name.val('');

        }
    });

});