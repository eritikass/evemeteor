/**
 * Created by eritikass on 24/02/16.
 */

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
        var hours = moment(date).diff(new Date(), 'hours');
        var days = moment(date).diff(new Date(), 'days');

        if (!days) {
            return hours + 'h';
        }

        hours -= 24*days;

        return  days + 'd ' +hours + 'h';

    },
    'rowClass': function() {
        var days = moment(this.fuelLeftUntil).diff(new Date(), 'days');
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
    }
});