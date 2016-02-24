/**
 * Created by eritikass on 24/02/16.
 */

Template.apikeys.helpers({
    'getApikeys': function() {
        Meteor.subscribe('user_apikeys')
        return Apikeys.find({}, {sort: {created: -1}});
    },
    'stateGymp': function(state, type) {
        switch (state) {
            case 'new':
                return 'minus';
                break;

            default:
                return 'question-sign';
        }
    },
    'keyinfo': function(row) {
        if (row.info) {
            return row.info;
        }
        if (row.state == 'new') {
            return 'waiting for processing...';
        }
        if (row.state == 'process') {
            return 'process';
        }
        return 'unknown, state=' + row.state;
    }
});