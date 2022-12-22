const db = require('../DAL/Repository/repository');
const data = require('../../pokemon.json')
const service = require('../Services/service');

const pokedex = db.collection('pokedex');
let bulkWriter = db.bulkWriter()
let writeBatch = db.batch()


exports.createPokedex = async (req, res) => {

    try {

        data.forEach(async function (pokemon) {

            const pokeRef = pokedex.doc(pokemon.id + '')

            await bulkWriter
                .delete(pokeRef)
                .then(
                    result => {
                        console.log('Delete success!');
                    })
                .catch(err => {
                    console.log('Deletion failed cause of: ', err);
                });

            await bulkWriter
                .set(pokeRef, {pokemon})
                .then(result => {
                    console.log('BulkWriter success');
                })
                .catch(err => {
                    console.log('BulkWriter failed: ', err);
                })



            // setDoc(pokeRef, pokemon, {merge: true})
            //     .then(pokeRef => {
            //         console.log('Document has been added successfully!');
            //     })
            //     .catch(err => {
            //         console.log('Adding failed cause of: ', err);
            //     })

            // await db.runTransaction(async (t) => {
            //     const doc = await t.get(pokeRef);
            //     const newPokemon = doc.data()
            //     t.update(pokeRef, {pokemon: newPokemon})
            // }).catch(err => {
            //     console.log(err);
            // })


            // await batch.update(pokeRef, {pokedex : pokemon});


            // await pokedex.add(pokemon);

        });

        console.log('Data sent to Firestore successfully...');

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