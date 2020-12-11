const mongoose = require('mongoose');

// Conditions pour insérer des données dans la base de données
const styloSchema = mongoose.Schema({
    marque: String, 
    couleur: String, 
    prix: Number   
}); 

module.exports = mongoose.model('Stylo', styloSchema);
