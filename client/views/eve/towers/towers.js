/**
 * Created by eritikass on 24/02/16.
 */

var keyid2corp = {};

Template.towers.helpers({
    'getTowers': function() {
        Meteor.subscribe('user_towers');
        return Towers.find({"state": "ok"}, {sort: {fuelLeftUntil: 1}});
    },
    'getTowerTypeName': function(typeId) {
        if (POS_DATA[typeId]) {
            return POS_DATA[typeId].typeName;
        }
        return 'err-typeId(' + typeId + ')';
    },
    'countdown': function(date) {
        if (date === undefined) {
            return '???';
        }

        if (!date) {
            return '0h';
        }

        var hours = moment(date).diff(new Date(), 'hours');
        var days = moment(date).diff(new Date(), 'days');

        if (!days) {
            return hours + 'h';
        }

        hours -= 24*days;

        return  days + 'd ' +hours + 'h';

    },
    'rowClass': function() {
        if (this.fuelLeftUntil === undefined) {
            return '';
        }

        var days = moment(this.fuelLeftUntil).diff(new Date(), 'days') || 0;
        if (days < 3) {
            return 'danger';
        }
        if (days < 6) {
            return 'warning';
        }

        if (days > 20) {
            return 'success';
        }

        return '';
    },
    'getCorpName': function(key_id) {
        if (!keyid2corp[key_id]) {
            Meteor.subscribe('user_apikeys');
            var key = Apikeys.findOne(key_id);

            keyid2corp[key_id] = (key && key.corpName) ||  key_id;
        }


        if (key_id == keyid2corp[key_id] && (this.key_id_eve == 5076572)) {
            return 'Welcome to Estonia [E5T]';
        }
        if (key_id == keyid2corp[key_id] && (this.key_id_eve == 5075766)) {
            return 'The Northerners [N8RTH]';
        }

        return keyid2corp[key_id];

    }
});