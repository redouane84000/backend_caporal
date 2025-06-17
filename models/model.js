const db = require('../config/db');

const createContact = (nom, email, sujet, message, callback) => {
    const sql = 'INSERT INTO contact (nom, email, sujet, message) VALUES (?, ?, ?, ?)';
    db.query(sql, [nom, email, sujet, message], (err, result) => {
      callback(err, result);
    });
  };
  
  module.exports = {
    createContact
  };
