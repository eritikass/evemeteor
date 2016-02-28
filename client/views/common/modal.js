/**
 * Created by eritikass on 28/02/16.
 */

Template.modal.onRendered(function () {

    var $modal = $('#EM_MODAL');

    $modal.bind('createmodal', function(event, args) {

        args = args || {};
        var options = {};

        var $footer = $modal.find('.modal-footer');
        $footer.find('.btn:not(.modal_default)').remove();

        $modal.find('.modal-title').html(args.title || 'title missing');
        $modal.find('.modal-body p').html(args.body || 'body missing');


        $modal.modal(options);

        _.each(args.buttons, function(item, key) {
            $footer.append($('<button type="button" class="btn ' + item + '">' + key + '</button>'));
        });

        if (typeof args.ready == 'function') {
            args.ready();
        }

    });

});