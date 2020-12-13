// LES ROUTES QUI VONT DECLENCHER DES ACTIONS !

// importe les modules utiles
const express = require('express')
const path = require('path')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = express.Router()

// importe le controller
const controller = require('../controllers/controller')
const auth = require('../controllers/auth')


// utilise la méthode override
router.use(controller.override)

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


router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        })
    }
)

// a successfully logged in user will generate a token
router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurred.');

                        return next(error)
                    }
                    req.login(
                        user, { session: false },
                        /* false because you do not want to store the user details in a session. 
                        You expect the user to send the token on each request to the secure routes.*/
                        async (error) => {
                            if (error) return next(error);

                            const body = { _id: user._id, email: user.email }
                            const token = jwt.sign({ user: body }, 'TOP_SECRET')

                            return res.redirect('api/?secret_token=`{ token }`')
                        }
                    )
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next)
    }
)


module.exports = router