// LES ROUTES QUI VONT DECLENCHER DES ACTIONS !

// importe les modules utiles
const express = require('express');
const path = require('path');

const router = express.Router();

// importe le controller
const controller = require('../controllers/controller');


// MIDDLEWARE POUR LE METHOD OVERRIDE !
router.use(function(req, res, next) {
    if (req.query._method == 'DELETE') {
        req.method = 'DELETE';
        req.url = req.path;
    } else if (req.query._method == 'PUT') {
        req.method = 'PUT';
        req.url = req.path;
    }
    next();
});

// TOUT CE QU'IL Y A PLUS BAS CONCERNE LA ROUTE / (roots)
router.all('/', controller.showAll);


// TOUT CE QU'IL Y A PLUS BAS CONCERNE LA ROUTE /stylos  
router.route('/stylos')
    .get(controller.getAll)
    .post(controller.postNewstylo);


// TOUT CE QU'IL Y A PLUS BAS CONCERNE LA ROUTE /stylos/id 
router.route('/stylos/:id')
    .get(controller.getOneStylo)
    .put(controller.putOneStylo)
    .delete(controller.deleteOneStylo);

/* TOUT CE QU'IL Y A PLUS BAS CONCERNE LA ROUTE /stylos/delete/id 
router.all('/stylos/delete/:id', controller.deleteOneStylo);*/

router.get('/about', controller.about);


module.exports = router;