const express = require('express');
const router = express.Router();
// import
const { myfunction } = require('../controllers/authController');
// route
router.get('/create-or-update-user', myfunction);

module.exports = router;
