const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const Contact = require('../models/model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Clé SECRÈTE Stripe (mode test)


const controllersFonction = (req, res) => {
    res.send("Hello World ici c'est le Zga de la back");
}

const envoyerFormulaire = (req, res) => {
    const { nom, email, sujet, message } = req.body;
  
    if (!nom || !email || !sujet || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }
  
    Contact.createContact(nom, email, sujet, message, (err, result) => {
      if (err) {
        console.error('Erreur MySQL2 :', err);
        return res.status(500).json({ error: 'Erreur serveur.' });
      }
  
      res.status(201).json({ message: 'Formulaire bien enregistré.' });
    });
};

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    // Validation du montant
    if (!amount || amount < 50) {
      return res.status(400).json({ 
        error: 'Le montant minimum est de 50 centimes (0.50€)' 
      });
    }

    // Création du PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Montant en centimes
      currency: 'eur',
      automatic_payment_methods: { 
        enabled: true 
      },
      metadata: {
        integration_check: 'accept_a_payment'
      }
    });

    // Envoi du client_secret au frontend
    res.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('Erreur Stripe:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la création du paiement',
      details: error.message 
    });
  }
};

module.exports = controllersFonction;
module.exports = {
    envoyerFormulaire,
    createPaymentIntent
};
