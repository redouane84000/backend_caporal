const express = require('express');
const router = express.Router();
const { envoyerFormulaire, createPaymentIntent } = require('../controllers/controller');


router.post('/contact', envoyerFormulaire);
router.post('/payment/create-payment-intent', createPaymentIntent);

module.exports = router;