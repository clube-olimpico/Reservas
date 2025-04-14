// backup-firebase.js
const fs = require('fs');
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://agenda-5ce95-default-rtdb.firebaseio.com"
});

const db = admin.database();

console.log("🚀 Iniciando backup..."); // Adicione esta linha

db.ref("/").once("value").then(snapshot => {
  console.log("💾 Dados lidos do Firebase."); // Adicione esta linha
  fs.writeFileSync("agenda-5ce95-default-rtdb-export.json", JSON.stringify(snapshot.val(), null, 2));
  console.log("✅ Backup concluído."); // Mantenha esta linha
}).catch(error => {
  console.error("❌ Erro durante o backup:", error); // Adicione esta linha para tratar erros
});
