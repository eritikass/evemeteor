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
        });
    },
    'click .logout': function () {
        Meteor.logout();
    }
});