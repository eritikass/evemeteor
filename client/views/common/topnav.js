/**
 * Created by eritikass on 24/02/16.
 */

Meteor.setInterval(function () {
    Session.set('date', new Date());
}, 1000);

Template.topnav.helpers({
   'getDate': function() {
        return Session.get('date') || new Date();
   }
});