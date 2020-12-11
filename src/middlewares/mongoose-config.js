const mongoose = require('mongoose');
const credentials = require('./mongodb-credentials');

//Connexion à la DBB
mongoose.connect(credentials, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = mongoose;
