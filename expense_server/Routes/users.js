const express = require('express');
const router = express.Router();
const { register, signin } = require('../Controller/users');

router.post('/signin', signin);
router.post('/register', register);
module.exports = router;