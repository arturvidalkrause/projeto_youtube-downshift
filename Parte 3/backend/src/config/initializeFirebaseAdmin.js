const admin = require('firebase-admin');

exports.initializeConnectionFirebaseAdmin = async () => {
	try {
		const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON);
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount)
		});
		console.log('Firebase Admin SDK inicializado com sucesso');
	} catch (error) {
		console.error('Erro ao inicializar o Firebase Admin SDK', error);
		process.exit(1);
	}
}