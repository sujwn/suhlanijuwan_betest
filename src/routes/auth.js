const express = require('express');
const router = express.Router();
const validation = require('../middlewares/validation');
const authController = require('../controllers/authController');

// POST route to login with userName and accountNumber
router.post('/login', 
    validation.validate,
    authController.login
);

module.exports = router;
