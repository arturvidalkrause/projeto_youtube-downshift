const admin = require('firebase-admin');

async function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(403).send('Acesso não autorizado: Token não fornecido ou malformatado.');
	}

	const idToken = authHeader.split('Bearer ')[1];

	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		req.user = decodedToken;
		next();
	} catch (error) {
		console.error('Erro ao verificar o token de ID do Firebase:', error);
		res.status(403).send('Acesso não autorizado: Token inválido ou expirado.');
	}
}

module.exports = {
	authMiddleware
};