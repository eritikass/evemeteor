/**
 * ## Handlebars Helpers ##
 * Custom Handlebars helpers.
 *
 * Created by eritikass on 24/02/16.
 */

Handlebars.registerHelper('currentRouteName', function(myArgument){
    try {
        return Router.current().route.getName();
    } catch (e) {
        return 'notFound';
    }
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
