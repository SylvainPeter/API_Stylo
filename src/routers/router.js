// LES ROUTES QUI VONT DECLENCHER DES ACTIONS !

// importe les modules utiles
const express = require('express')
const path = require('path')

const router = express.Router()

// importe le controller
const controller = require('../controllers/controller')
const auth = require('../controllers/auth')


// MIDDLEWARE POUR LE METHOD OVERRIDE !
router.use(function(req, res, next) {
    if (req.query._method == 'DELETE') {
        req.method = 'DELETE'
        req.url = req.path
    } else if (req.query._method == 'PUT') {
        req.method = 'PUT'
        req.url = req.path
    }
    next();
});

router.get('/', auth.showLogin)

router.get('/signup', auth.showSignup)

router.get('/api', controller.showAllstylos)

router.route('/api/stylos')
    .get(controller.getAllstylos)
    .post(controller.postNewstylo)

router.route('/api/stylos/:id')
    .get(controller.getOneStylo)
    .put(controller.putOneStylo)
    .delete(controller.deleteOneStylo)

router.get('/api/about', controller.about)


module.exports = router