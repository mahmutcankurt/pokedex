exports.deleteCollection = async (db, collectionPath) => {

    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__');

    return new Promise((resolve, reject) => {
        this.deleteQueryBatch(db, query, resolve).catch(reject);
    });

};

exports.deleteQueryBatch = async (db, query, resolve) => {

    const snapshot = await query.get();

    const batchSize = snapshot.size;

    if (batchSize === 0) {
        resolve();
        return;
    }

    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });

    await batch.commit();

    process.nextTick(() => {
        this.deleteQueryBatch(db, query, resolve)
    });

};

