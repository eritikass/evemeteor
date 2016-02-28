/**
 * bacground update jobs
 *
 * this page will be using meteor cron
 * @link https://github.com/percolatestudio/meteor-synced-cron
 *
 * and mongodb triggers for new api keys
 * @link https://github.com/matb33/meteor-collection-hooks
 *
 * Created by eritikass on 25/02/16.
 */


SyncedCron.config({
    // dont spam log output
    log: false,
});

SyncedCron.add({
    name: 'fetch_StarbaseDetail',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 5 minute');
    },
    job: function() {
        var dateMin = moment().subtract(30, 'minute').toDate();
        var res = {};

        // first time api towers
        Towers.find({api_cachedUntil: { $exists: false }, "state": "ok"}, {sort: {state_date: 1}, limit: 90}).forEach(function(tower) {
            res[tower._id] = 'new';
            APIHELPERS.fetch_StarbaseDetail(tower._id);
        });

        // update old towers
        Towers.find({api_cachedUntil: { $exists: true }, "state": "ok", api_cachedUntil: {$lt: dateMin}}, {sort: {state_date: 1}, limit: 50}).forEach(function(tower) {
            res[tower._id] = 'old';
            APIHELPERS.fetch_StarbaseDetail(tower._id);
        });

        if (Object.keys(res).length > 0) {
            return Object.keys(res).length + '>' +JSON.stringify(res);
        }

        return null;
    }
});


SyncedCron.add({
    name: 'fetch_APIKeyInfo',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 1 hour');
    },
    job: function() {
        var res = {};

        // update old api keys
        var dateMin = moment().subtract(30, 'minute').toDate();
        Apikeys.find({api_cachedUntil: {$lt: dateMin}, 'state': 'ok'}, {sort: {state_date: 1}, limit: 50}).forEach(function(key) {
            res[key._id] = 'old';
            APIHELPERS.fetch_APIKeyInfo(key._id);
        });

        if (Object.keys(res).length > 0) {
            return Object.keys(res).length + '>' +JSON.stringify(res);
        }

        return null;
    }
});


/*

SyncedCron.add({
    name: 'cron_cleanup',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 1 hour');
    },
    job: function() {
        // delete all jobs that did nothing after 24h
        // delete all jobs that did something after 1 week
    }
});

*/

SyncedCron.start();

// Apikeys after insert hook,
// pick up new api keys once thy added
Apikeys.after.insert(function (userId, doc) {
    APIHELPERS.debug('Apikeys.after.insert: ' + doc._id + ' # ' + doc.keyid);
    APIHELPERS.fetch_APIKeyInfo(doc._id);
});
