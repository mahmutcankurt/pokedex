const express = require('express');
const router = express.Router();
const pokeControllers = require('../Controllers/controller');

/* POST METHODS */

router.post('/create-pokedex', pokeControllers.createPokedex);
// router.get('/pokemon/list', pokeControllers.getPokemonList);
// router.post('/pokemon/list', pokeControllers.getPokemonList);
// router.post('/image/upload', pokeControllers.createPokedex);


/* GET METHODS */

// router.get('/pokemon/:id', pokeControllers.createPokedex);
// router.get('/image/:name', pokeControllers.createPokedex);

module.exports = router;

