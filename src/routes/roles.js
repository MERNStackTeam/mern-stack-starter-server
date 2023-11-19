const express = require('express');

const role = require('../controllers/roles');

const router = express.Router();

router.get('/', role.rolechecking);
router.post('/', role.creatroles);
router.get('/getallroles', role.getallroles);

module.exports = router;
