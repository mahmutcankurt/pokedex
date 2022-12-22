const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
    projectId: 'weoll-mahmut-sandbox'
})

module.exports = db;