const express = require('express');
const router = express.Router();
const { envoyerFormulaire } = require('../controllers/controller');


router.post('/contact', envoyerFormulaire);

module.exports = router;