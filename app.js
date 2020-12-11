// MON APPLI STYLO !

//importe les modules
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");

const myRouter = require('./src/routers/router'); //importe le router
const mongoose = require('./src/middlewares/mongoose-config'); //importe la configuration Mongoose
const multer = require('./src/middlewares/multer-config'); //importe la configuration Multer

// créé une instance d'Express
const app = express();

// CONFIGURATION DE L'APPLI
app.set("json spaces", 4); // définit la présentation souhaitée des objets JSON
app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs'); // définit EJS comme module Views


app.use(express.static('public')) // définit le chemin des fichiers statiques
app.use(bodyParser.urlencoded({extended: false})); // l'appli utilise Body Parser

app.use(myRouter); // l'appli utilise le Router


// exporte l'appli
module.exports = app;
