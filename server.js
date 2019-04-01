const express = require('express');
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var router = express.Router();

var mongoose = require('mongoose');
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var urlmongo = "mongodb://sclere:ibl3sstherainsdowninAfrica@ds229186.mlab.com:29186/react_pokedex";

mongoose.connect(urlmongo, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});



var UserSchema = mongoose.Schema({
    pseudo: String,
    nbPokemon: Number,
    friends: [String],
    pokemons: [Number]
});

var User = mongoose.model('User', UserSchema);

router.route('/users')
    .get( (req,res) => {
        User.find((err, users) => {
            if(err){
                res.send(err);
            }
            res.json(users)
        })
    })
    .post((req,res) => {
        var user = new User();
        user.pseudo = req.body.pseudo;
        user.nbPokemon = req.body.nbPokemon;
        user.friends = req.body.friends;
        user.pokemons = req.body.pokemons;
        user.save(function(err){
            if(err){
                res.send(err);
            }
            res.send({message : 'User insert'});
        })
    });


router.route('/')
    .all((req,res) => {
        res.json({message : "API POUR LE POKEDEX REACT", methode : req.method});
    });


router.route('/users/:user_id')
    .get((req,res) => {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
    })
    .put((req,res) => {
        User.findById(req.params.user_id, function(err, user) {
            if (err){
                res.send(err);
            }
            user.pseudo = req.body.pseudo;
            user.nbPokemon = req.body.nbPokemon;
            user.friends = req.body.friends;
            user.pokemons = req.body.pokemons;
            user.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({message : 'Bravo, mise à jour des données OK'});
            });
        });
    })
    .delete((req,res) => {
        User.remove({_id: req.params.user_id}, function(err, user){
            if (err){
                res.send(err);
            }
            res.json({message:"user deleted"});
        });
    });



app.use(router);
app.listen(3000, function() {
    console.log('listening on 3000')
})