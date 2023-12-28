var restify = require('restify');

var server = restify.createServer();

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}
server.put('/hello', respond);
server.get('/hello/:name', respond);
server.del('/hello/:name', function (req, res, next) {
    res.send(204)
    return next();
});

server.get('/producto/pro/asd', function (req, res, next) {
    res.send('Hola');
    return next();
});
server.get('/foo/:id',

    function (req, res, next) {
        console.log('Authenticate');
        return next();
    },

    function (req, res, next) {
        res.send(200);
        return next();
    }

);

server.get({ name: 'city', path: '/cities/:slug' },
    function (req, res, next) {
        console.log(req.params.slug);
        req.someData = req.params.slug;
        return next();
    },

    function (req, res, next) {
        res.contentType = 'json';
        res.send({
            country: req.someData,
            capital: server.router.render('city', { slug: req.someData }, { details: true })
        });
        return next();
    });


server.post('/foo', function (req, res, next) {
    req.someData = 'foo';
    return next();
},
    function (req, res, next) {
        //res.send(req.someData);
        res.send(201, Math.random().toString(36).substr(3, 8));
        return next();
    }
);
server.get('/mascotas', listarMascota);

//ANTES DE CARGAR CADA PETICION
server.pre(
    //the server will now convert requests to /hello//jake => /hello/jake
    restify.plugins.pre.dedupeSlashes()

);


//SE USA CUANDO SE ESTÁ EJECUTANDO TODAS LAS CONSULTAS
server.use(function (req, res, next) {
    console.warn('run for all routes!');
    return next();
});

server.listen(config.port, function () {
    console.log('%s listening at %s', server.name, server.url);
});