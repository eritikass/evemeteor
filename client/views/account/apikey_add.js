/**
 * Created by eritikass on 24/02/16.
 */


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

            var key_id = parseInt($key_id.val(), 10);
            var v_code = $v_code.val()

            Meteor.call('add_apikey', key_id, v_code, function (err, res) {
                if (err || !res) {
                    //$key_id.val(key_id);
                    //$v_code.val(v_code);

                    validator.showErrors({
                        eve_api_key_id: "Unknown error when adding api key, please try again!"
                    });
                    return;
                }
                Router.go('apikeys');
            });

            $key_id.val('');
            $v_code.val('');

        }
    });
});