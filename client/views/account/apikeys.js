/**
 * Created by eritikass on 24/02/16.
 */

Template.apikeys.helpers({
    'getApikeys': function() {
        Meteor.subscribe('user_apikeys');
        Meteor.subscribe('user_apikeys_groups');
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
    'keyInfo': function() {
        if (this.info) {
            return this.info;
        }
        if (this.state == 'new') {
            return 'waiting for processing...';
        }
        if (this.state == 'process') {
            return 'process';
        }
        return 'unknown, state=' + this.state + (this.state == 'errapi'&&this.errCode ? ', code: ' + this.errCode : '');
    },
    'keyAccess': function() {
       if (this.group) {
           var g = Apikeys_groups.findOne(this.group);
           if (g) {
               return 'group: ' + g.name;
           }
       }

        return 'personal';
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


Template.apikeys.events({
    'click .remove-apikey': function() {
        var keyID = this.keyid;
        var mongoId = this._id;
        var $modal = $('#EM_MODAL');

        $modal.trigger('createmodal', {
            'title': 'remove apikey (id:'  + this.keyid + '; name: ' + this.keyName + ')',
            'body': 'write KeyID to confirm delete: <br> ' +
                ' <div class="input-group"><span class="input-group-addon" id="basic-addon1">keyID: </span><input type="text" class="form-control remove-apikey-cc" placeholder="keyID" aria-describedby="basic-addon1"></div> ',
            'buttons': {
                'Delete': 'btn-danger disabled removekeybtn'
            },
            'ready': function() {
                var $confirmTxt = $modal.find('.remove-apikey-cc');
                var $btn = $modal.find('.removekeybtn');

                var isKeyOk = function() {
                    return ($confirmTxt.val() == keyID);
                }
                $confirmTxt.on('change keyup keydown', function() {
                    $btn.toggleClass('disabled', !isKeyOk());
                });

                $btn.click(function() {
                    if (!isKeyOk()) { return; }

                    Meteor.call('remove_apikey', mongoId, function(err, res) {
                        if (err) {
                            return alert('unknown error');
                        }
                        $modal.modal('hide');
                    });

                });

            }
        });



    }
});
