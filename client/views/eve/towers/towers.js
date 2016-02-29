/**
 * Created by eritikass on 24/02/16.
 */

Session.set('towersort_column', 'fuelLeftUntil');
Session.set('towersort_direction', 1);

Template.towers.helpers({
    'getTowers': function() {
        Meteor.subscribe('user_towers');

        var sort = {};
        sort[Session.get('towersort_column')] = Session.get('towersort_direction');

        return Towers.find({"state": "ok"}, {sort: sort});
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
    'shorternTowerName': function(towername) {
        return $.trim(towername).replace('Control Tower', 'CT');
    }
});

Template.towers.events({
    'click .listtowers thead tr th': function(event) {
        var $this = $(event.target);
        if (!$this.is('th')) {
            $this.closest('th');
        }
        var column = $this.data('order');
        if (!column) { return; }
        var direction = $this.data('direction') ? 1 : -1;

        Session.set('towersort_column', column);
        Session.set('towersort_direction', direction);

        $this.data('direction', direction == -1);

        $('.listtowers thead tr th .glyphicon').remove();
        $this.prepend($('<span aria-hidden="true"></span>').addClass('glyphicon glyphicon-chevron-' + (direction == -1?'up':'down')));

    }
});