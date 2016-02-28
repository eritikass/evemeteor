/**
 * ## Handlebars Helpers ##
 * Custom Handlebars helpers.
 *
 * Created by eritikass on 24/02/16.
 */

var getRouteName = function(){
    try {
        return Router.current().route.getName();
    } catch (e) {
        return 'notFound';
    }
};

Handlebars.registerHelper('currentRouteName', getRouteName);

Handlebars.registerHelper('isRoute', function(routeName){
    return getRouteName() == routeName;
});

Handlebars.registerHelper('disableIfRoute', function(routeName, type){
    if (getRouteName() != routeName) {
        return '';
    }
    return 'disabled';
});

Handlebars.registerHelper('userNotMe', function(userId){
    return (!Meteor.userId() || Meteor.userId() != userId);
});

Handlebars.registerHelper('equals', function(a, b) {
    return (a == b);
});


Handlebars.registerHelper('formatDate', function(date, type){
    type = type || 'date';
    if (!date) {
        return '-';
    }
    var m = moment(date).utc();
    if (type == 'time') {
        return m.format('HH:mm:ss');
    }
    return m.format('YYYY-MM-DD HH:mm');
});
