const router = require('express').Router();
const { signup } = require('../../../controllers/v2/user/signup');
const { login } = require('../../../controllers/v2/user/login');

router.post('/login', login);
router.post('/signUp', signup);
module.exports = router;
