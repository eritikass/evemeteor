/**
 * Created by eritikass on 24/02/16.
 */

Template.topnav_account.events({
    'click .logineveonlines': function () {
        Meteor.loginWithEveonline({}, function(e) {
            if (e && e.message && /not configured/ig.test(e.message)) {
                $('.logineveonlines').hide();
                $('.logineveonlines-uiorg').show();
            }

            if (Meteor.userId()) {
                Meteor.subscribe('user_apikeys')
                if (Apikeys.find({'state': 'ok'}).count() == 0) {
                    Router.go("apikeys");
                }
            }
        });
    },
    'click .logout': function () {
        Meteor.logout();
    }
});