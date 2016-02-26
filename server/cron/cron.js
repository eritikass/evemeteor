/**
 * Created by eritikass on 25/02/16.
 */


//
new Cron(function() {

    Towers.find({fuelLeftUntil: { $exists: false }}, {sort: {state_date: 1}, limit: 30}).forEach(function(tower) {
        APIHELPERS.fetch_StarbaseDetail(tower._id);
    });

}, {});



new Cron(function() {

    console.log('minute_3');

    var dategt = moment().subtract(12, 'hours');

    Towers.find({fuelLeftUntil: { $exists: true }, state_date: {$gt: dategt}}, {sort: {state_date: 1}, limit: 30}).forEach(function(tower) {
        console.log(tower);
        APIHELPERS.fetch_StarbaseDetail(tower._id);
    });

}, {
    minute: 3,
});


/*

Apikeys.find({state: "new"}).forEach(function (bsonObj) {
    console.log('bsonObj', bsonObj);
});

*/

// pick up new api keys once thy added
Apikeys.after.insert(function (userId, doc) {
    APIHELPERS.debug('Apikeys.after.insert: ' + doc._id + ' # ' + doc.keyid);
    APIHELPERS.fetch_APIKeyInfo(doc._id);
});

// pick up new towers once they added
//Towers.after.insert(function (userId, doc) {
//    APIHELPERS.debug('Towers.after.insert: ' + doc._id + ' # ' + doc.keyid);
//    APIHELPERS.fetch_StarbaseDetail(doc._id);
//});