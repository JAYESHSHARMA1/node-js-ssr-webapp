const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router
.route('/logout')
.get(authController.logout);

router
.route('/login')
.get(authController.getLogin)
.post(authController.login);

router
.route('/create-new-account')
.get(authController.createNewAccount)
.post(authController.postCreateNewAccount);

router
.route('/forgot-password')
.get(authController.getForgotPassword)
.post(authController.postForgotPassword);

router
.route('/reset-password/:date')
.get(authController.getResetPassword)
.post(authController.postResetPassword);



module.exports = router;
