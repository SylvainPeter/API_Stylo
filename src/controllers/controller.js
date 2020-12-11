// LA LOGIQUE METIER !

// importe le modele Moongoose
const Stylo = require('../models/stylos')


exports.showAllstylos = (req, res) => {
    res.render("index")
};


exports.getAllstylos = (req, res) => {
    Stylo.find(function(err, stylos) {
        if (err) {
            res.send(err)
        }
        res.render('collection', {
            stylos: stylos
        })
    })
}


exports.postNewstylo = (req, res) => {
    // Nous utilisons le schéma Stylo
    var stylo = new Stylo()
    // Nous récupérons les données reçues pour les ajouter à l'objet Stylo
    stylo.marque = req.body.marque
    stylo.couleur = req.body.couleur
    stylo.prix = req.body.prix
    //Nous stockons l'objet en base
    stylo.save((err) => {
        if (err) {
            res.send(err)
        }
        res.redirect('/api/stylos/')
    })
}


exports.getOneStylo = (req, res) => {
    //Mongoose prévoit une fonction pour la recherche d'un document par son identifiant
    Stylo.findById(req.params.id, function(err, stylo) {
        if (err)
            res.send(err)
        res.render('item', {
            stylo: stylo
        })
    })
}


exports.putOneStylo = (req, res) => {
    // On commence par rechercher le stylo souhaité
    Stylo.findById(req.params.id, function(err, stylo) {
        if (err) {
            res.send(err)
        }
        // Mise à jour des données du stylo
        stylo.marque = req.body.marque;
        stylo.couleur = req.body.couleur;
        stylo.prix = req.body.prix;
        stylo.save(function(err) {
            if (err) {
                res.send(err)
            }
            // Si tout est ok
            res.redirect('/api/stylos/')
        })
    })
}


exports.deleteOneStylo = (req, res) => {
    Stylo.remove({
        _id: req.params.id
    }, function(err, stylo) {
        if (err) {
            res.send(err)
        }
        res.redirect('/api/stylos/')
    })
}


exports.about = (req, res) => { 
    res.render("about") 
}