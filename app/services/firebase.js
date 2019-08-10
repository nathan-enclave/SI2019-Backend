const firebase = require('firebase-admin');

const serviceAccount = require('./enclave-23839-firebase-adminsdk-9wxd8-8026daa48f.json');

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
