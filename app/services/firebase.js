const firebase = require('firebase-admin');

const serviceAccount = require('./enclave-storage-firebase-adminsdk-ph6ho-de1373a3a5.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

class Firebase {
  constructor() {
    this.database = firebase.firestore();
    this.database.settings({ timestampsInSnapshots: true });
    this.collection = 'activities';
  }

  save(data) {
    this.database
      .collection(this.collection)
      .doc()
      .set(data);
  }
}
module.exports = new Firebase();
