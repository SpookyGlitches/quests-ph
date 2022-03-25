import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        apiKey: "AIzaSyD9au993451St6EInmWNlcuOaNNb8or0Hc",
        authDomain: "quests-ph-1ee4e.firebaseapp.com",
        projectId: "quests-ph-1ee4e",
        storageBucket: "quests-ph-1ee4e.appspot.com",
        messagingSenderId: "97977669628",
        appId: "1:97977669628:web:2b5832a5db86c95bccc479",
      }),
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}
export default admin.firestore();
