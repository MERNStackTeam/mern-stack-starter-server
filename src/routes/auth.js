const express = require('express');

const authentication = require('../controllers/auth');

const router = express.Router();

router.post('/register', authentication.registerUser);
router.post('/login', authentication.loginUser);
router.post('/logout', authentication.logoutUser);

module.exports = router;
