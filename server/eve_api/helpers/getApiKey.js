/**
 * Created by eritikass on 27/02/16.
 */


APIHELPERS.getApiKey = function(mongoID, raw) {

    var q = {'_id': mongoID};

    if (!raw) {
        q.state = { $in: ['ok', 'process']};
    }

    return Apikeys.findOne(q);

}