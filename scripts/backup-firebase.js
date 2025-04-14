// backup-firebase.js
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://agenda-5ce95-default-rtdb.firebaseio.com"
});

const db = admin.database();

async function backupFirebase() {
  try {
    const snapshot = await db.ref("/").once("value");
    const data = snapshot.val();
    console.log("✅ Backup dos dados do Firebase concluído.");
    return JSON.stringify(data, null, 2); // Retorna os dados formatados como JSON
  } catch (error) {
    console.error("❌ Erro ao fazer backup do Firebase:", error);
    throw error;
  }
}

module.exports = backupFirebase;
