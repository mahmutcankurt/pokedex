const db = require('../DAL/Repository/repository');
const data = require('../../pokemon.json')
const service = require('../Services/service');

const pokedex = db.collection('pokedex');
let bulkWriter = db.bulkWriter()


exports.createPokedex = async (req, res) => {

    try {

        data.forEach(async function (pokemon) {

            const pokeRef = pokedex.doc(pokemon.id + '')

            bulkWriter
                .delete(pokeRef)
                .then(
                result => {
                    console.log('Deleted successfully!');
                })
                .catch(err => {
                console.log('Deletion failed cause of: ', err);
            });

            await pokedex.add(pokemon);

        });

        console.log('Data sent to Firestore successfully...');

        return true;

    } catch (error) {

        return error.message;

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