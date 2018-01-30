// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
console.log('Trying to connect ' + db.url);

// var promise = mongoose.connect('mongodb://ProdRead:ProdRead%40123@10.9.52.51:10050/CollectionsDB?authSource=admin', {
//   useMongoClient: true,
//   /* other options */
// });
// // Or `createConnection`
// var promise = mongoose.createConnection('mongodb://ProdRead:ProdRead%40123@10.9.52.51:10050/CollectionsDB?authSource=admin', {
//   useMongoClient: true,
//   /* other options */
// });
// promise.then(function(db) {
//  db.model.find({ "status": "A"}, {_id: 0}, function (error, data) {
//         if(error) {
//              console.log('Error while retrieving master Data' + error);
//              res.json('Error while retrieving master Data' + error);
//         } else {
//              console.log('Users are retrieved successfully');
//              res.json(data);
//         }
//      }) /* Use `db`, for instance `db.model()`
// });
// Or, if you already have a connection
// connection.openUri('mongodb://localhost/myapp', { /* options */ });


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes
//app.use('/home',require('./app/routes').router);

// start app ===============================================
app.listen(port);	
console.log('Listening on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app