/**
 * Created by eritikass on 26/02/16.
 */


APIHELPERS.getEveApi = function() {
    // TODO: improve it, like add caching config etc...
    return Meteor.npmRequire('eveonlinejs');
}