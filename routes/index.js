const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');
const authMiddleware = require('./../middlewares/auth');

/* GET home page. */
router
.route('/')
.get(authMiddleware.authenticate, indexController.index);

router
.route('/stocks')
.get(authMiddleware.authenticate, indexController.getStocks);

router
.route('/watchlist')
.get(authMiddleware.authenticate, indexController.getMyStocks);

router
.route('/profile')
.get(authMiddleware.authenticate, indexController.getProfile)
.post(authMiddleware.authenticate, indexController.postProfile);

router
.route('/upload-stocks-file')
.get(authMiddleware.authenticate,authMiddleware.isAdmin, indexController.getUploadStockFile)
.post(authMiddleware.authenticate,authMiddleware.isAdmin, indexController.postUploadStockFile);



module.exports = router;
