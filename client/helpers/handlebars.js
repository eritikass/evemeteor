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
