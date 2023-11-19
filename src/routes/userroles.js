const express = require('express');

const userroles = require('../controllers/userroles');

const router = express.Router();

router.post('/', userroles.creatUserRoles);
router.get('/', userroles.getUserRoles);

module.exports = router;
