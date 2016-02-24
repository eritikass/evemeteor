/**
 * Created by eritikass on 24/02/16.
 */

var addBgJob = function(methodName, callback) {
    Router.map(function() {
        this.route('bgjob_' + methodName, {
            path: '/bgcall/' + methodName,
            where: 'server',
            action: function () {
                var str = "run: " + methodName + "\n";
                var statusCode = 200;

                try {
                    str += callback(this.request.query || {});
                } catch (e) {
                    statusCode = 500;
                    str += 'error: ' + e.message
                    //    + "\n" + e.stack
                    ;
                }

                this.response.writeHead(statusCode, {'Content-Type': 'text/plain'});
                this.response.end(str);
            }
        });
    });
}


addBgJob('api_root', APIHELPERS.update);
