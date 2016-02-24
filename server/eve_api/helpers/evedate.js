/**
 * Created by eritikass on 24/02/16.
 */


APIHELPERS.evedate = function(datestr) {
    if (!datestr || !moment(datestr).isValid()) {
        return null;
    }

    // TODO: FIXME!! better date parse option that writing in +00 ?????
    var m = moment(datestr + '+00');
    return m.isValid() ? m.toDate() : null;
}