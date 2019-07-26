const firebase = require('firebase-admin');

const serviceAccount = require('./enclave-storage-firebase-adminsdk-ph6ho-de1373a3a5.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

module.exports = firebase;
