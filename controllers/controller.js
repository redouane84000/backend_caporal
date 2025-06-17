const express = require('express');
const Contact = require('../models/model');

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

module.exports = controllersFonction;
module.exports = {
    envoyerFormulaire
  };
