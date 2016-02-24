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
            case 'ok':
                if (type == 'Corporation') {
                    return 'list-alt';
                }
                return 'ok';
                break;
            case 'process':
                return 'refresh';
                break;
            default:
                if (state.substr(0, 3) == 'err') {
                    return 'remove';
                }
                return 'question-sign';
        }
    },
    'keyinfo': function() {
        if (this.info) {
            return row.info;
        }
        if (this.state == 'new') {
            return 'waiting for processing...';
        }
        if (this.state == 'process') {
            return 'process';
        }
        return 'unknown, state=' + row.state;
    },
    'rowClass': function(row) {
        var state = this.state && this.state || '';
        if (state.substr(0, 3) == 'err') {
            return 'danger';
        } else if (state == 'new' || state == 'process') {
            return 'info';
        } else if (state == 'ok') {
            if (this.type && this.type == 'Corporation') {
                return 'success success-corp';
            }
            return 'success';
        }

    }
});