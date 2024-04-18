const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authentication');
const { body } = require('express-validator');
const validation = require('../middlewares/validation');
const userController = require('../controllers/userController');

// GET all users
router.get('/', authenticateToken, userController.getAll);

// GET user by accountNumber
router.get('/account/:accountNumber', authenticateToken, userController.getByAccountNumber);

// GET user by identityNumber
router.get('/identity/:identityNumber', authenticateToken, userController.getByIdentityNumber);

// POST new user
router.post('/', authenticateToken, 
    body('userName').notEmpty().withMessage('Please enter userName'),
    body('accountNumber').notEmpty().withMessage('Please enter accountNumber'),
    body('emailAddress').notEmpty().withMessage('Please enter emailAddress').isEmail().withMessage('Invalid emailAddress'),
    body('identityNumber').notEmpty().withMessage('Please enter identityNumber'),
    validation.validate,
    userController.create);

// PATCH update existing user
router.patch('/:id', authenticateToken, userController.update);

// DELETE user
router.delete('/:id', authenticateToken, userController.delete);

module.exports = router;
