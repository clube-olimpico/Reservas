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
  let data = snapshot.val();

  // Função para filtrar dados sensíveis
  function filterSensitiveData(obj) {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    for (const key in obj) {
      if (key === 'githubToken') {
        obj[key] = '***SEGREDO_REMOVIDO***'; // Ou delete obj[key];
      } else if (typeof obj[key] === 'object') {
        filterSensitiveData(obj[key]);
      }
    }
    return obj;
  }

  const filteredData = filterSensitiveData(data);
  fs.writeFileSync("Reservas/scripts/agenda-5ce95-default-rtdb-export.json", JSON.stringify(filteredData, null, 2));
  console.log("✅ Backup concluído.");
  return admin.app().delete();
}).then(() => {
  console.log("🔥 Conexão com o Firebase encerrada.");
}).catch(error => {
  console.error("❌ Erro durante o backup:", error);
  process.exit(1);
});
