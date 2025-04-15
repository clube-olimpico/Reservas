// backup-firebase.js
const fs = require('fs');
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://agenda-5ce95-default-rtdb.firebaseio.com"
});

const db = admin.database();

console.log("🚀 Iniciando backup...");

db.ref("/").once("value").then(snapshot => {
  console.log("💾 Dados lidos do Firebase.");
  fs.writeFileSync("agenda-5ce95-default-rtdb-export.json", JSON.stringify(snapshot.val(), null, 2));
  console.log("✅ Backup concluído.");
  return admin.app().delete(); // Adicione esta linha para encerrar a conexão
}).then(() => {
  console.log("🔥 Conexão com o Firebase encerrada."); // Log opcional
}).catch(error => {
  console.error("❌ Erro durante o backup:", error);
  process.exit(1); // Encerre o processo com código de erro
});
