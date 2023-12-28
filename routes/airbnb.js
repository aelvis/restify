const { errors } = require("restify-errors");
const Customer = require('../models/customer');

module.exports = server => {
    server.get('/airbnb', async (req, res) => {
        try {
            res.header('content-type', 'json');
            const customer = await Customer.find({})
            res.send(customer);
        } catch (error) {
            console.log(error);
        }

    });

    server.get('/airbnb/:id', async (req, res) => {

        try {
            console.log(req.body);
            res.header('content-type', 'json');
            const customer = await Customer.findOne(JSON.parse(req.body))
            res.send(customer);
        } catch (error) {
            console.log(error);
        }

    });

    server.post('/airbnb', async (req, res) => {
        console.log(req.is('application/json'));
        console.log(req.body)
        const { name, email, balance } = req.body;
        const customer = new Customer({ name, email, balance });

        try {
            await customer.save();
            const numCustomer = await Customer.estimatedDocumentCount();
            res.send(201, { mensaje: 'Creado', 'total': numCustomer});
        } catch (error) {

        }

    });
    server.put('/airbnb/:id', async (req, res) => {
        try {
            await Customer.updateOne(req.body)
            res.send(200, { mensaje: 'Actualizado' });

        } catch (error) {
            console.log(error)
        }

    });

    server.del('/airbnb/:id', async (req, res) => {
        try {
            await Customer.deleteOne({_id: req.params.id})
            res.send(200, { mensaje: 'Eliminado' });

        } catch (error) {
            console.log(error)
        }

    });
}