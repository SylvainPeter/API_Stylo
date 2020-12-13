const express = require('express')
const router = express.Router()


// secure routes that only users with verified tokens can access
router.get(
  '/api',
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }
)

module.exports = router