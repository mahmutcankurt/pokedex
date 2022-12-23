const db = require('../DAL/Repository/repository');
const data = require('../../pokemon.json');
const service = require('../Services/service');
const fs = require('fs');

const pokemons = fs.readFileSync('pokemon.json');
const pokemonParsed = JSON.parse(pokemons);

const pokedex = db.collection('pokedex');
let bulkWriter = db.bulkWriter();
let docId = []

exports.createPokedex = async (req, res) => {

    try {

        // -- delete --

        const snapshot = await pokedex.get()

        snapshot.forEach(doc => {

            docId.push(doc.id);

        });

        docId.forEach(async function (docId) {

            const pokeRef = pokedex.doc(`${docId}`)

            bulkWriter.delete(pokeRef);

        });

        // -- end of delete --

        // -- set --

        data.forEach(async function (pokemon) {

            const pokeRef = pokedex.doc()

            bulkWriter.set(pokeRef, pokemon);

        });

        // -- end of set --

        // -- writer close --

        await bulkWriter.close().then(() => {
            console.log('Data sent to Firestore successfully...');
        });

        // -- end of writer close --

        return true;

    } catch (error) {

        const message = 'Error here: ' + error.message

        return message;

    }

};

exports.getPokemonList = async (req, res) => {

    const doc = await pokeRef.get()

    if (!doc.exists) {

        console.log('There is no such document..')

    } else {

        console.log('Document sent..');
        res.send(doc.data());
    }

    return true;

};