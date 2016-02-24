var onBeforeAction_checklogin = function(){
    if(Meteor.userId()){
        this.next();
    } else {
        Router.go("frontpage");
    }
}

Router.configure({
    layoutTemplate: 'main',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});



Router.route('/', {
    'name': 'frontpage',
    'template': 'frontpage',
});

Router.route('/apikeys/add', {
    'name': 'apikey_add',
    'template': 'apikey_add',
    'onBeforeAction': onBeforeAction_checklogin,
});

Router.route('/apikeys', {
    'name': 'apikeys',
    'template': 'apikeys',
    'onBeforeAction': onBeforeAction_checklogin,
});

Router.route('/towers', {
    'name': 'towers',
    'template': 'towers',
    'onBeforeAction': onBeforeAction_checklogin,
});
