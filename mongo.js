const mongoose = require('mongoose');
const config = require('./config');
const restify = require('restify');



var server = restify.createServer();
server.pre(restify.plugins.pre.dedupeSlashes());
server.use(restify.plugins.bodyParser());


server.listen(config.port, function () {
    console.log('%s listening at %s', server.name, server.url);
    mongoose.connect(config.db.uri, { useNewUrlParser: true });
});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("conexión a base de datos establecida...");
    require('./routes/airbnb')(server)
    require('./routes/users')(server)
});