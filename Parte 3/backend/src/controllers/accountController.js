const db = require('../config/db');

exports.createAccountMetadata = async (req, res) => {
	try {
		const { nanoid } = await import('nanoid');

		const {
			uid: firebaseId,
			name,
			email,
			email_verified: is_verified,
			picture: profile_picture_url,
			firebase
		} = req.user;

		const providerName = firebase.sign_in_provider;

		const providerQuery = {
			text: 'SELECT uid FROM login_provider_A WHERE _name = $1',
			values: [providerName],
		};
		const providerResult = await db.query(providerQuery);

		if (providerResult.rowCount === 0) {
			return res.status(500).json({ message: `Provedor de login '${providerName}' não encontrado no sistema.` });
		}
		const signInProviderUid = providerResult.rows[0].uid;


		const findUserQuery = {
			text: 'SELECT * FROM user_T WHERE firebaseid = $1',
			values: [firebaseId],
		};

		const { rows, rowCount } = await db.query(findUserQuery);

		let userInDb;
		let message;

		if (rowCount > 0) {
			message = 'Login bem-sucedido. Dados do usuário sincronizados.';
			console.log(`Usuário com firebaseid ${firebaseId} encontrado. Atualizando...`);

			const updateUserQuery = {
				text: `UPDATE user_T 
                       SET _name = $1, _profile_picture_url = $2, _is_verified = $3 
                       WHERE firebaseid = $4 RETURNING *`,
				values: [name, profile_picture_url, is_verified, firebaseId]
			};
			const result = await db.query(updateUserQuery);
			userInDb = result.rows[0];
			console.log(`Usuário com firebaseid ${firebaseId} atualizado.`);

		} else {
			message = 'Primeiro login. Conta criada com sucesso.';
			console.log(`Usuário com firebaseid ${firebaseId} não encontrado. Criando...`);

			const newNanoId = nanoid();

			const insertUserQuery = {
				text: `INSERT INTO user_T(nanoid, firebaseid, _name, _email, _is_verified, _profile_picture_url, sign_in_provider_uid) 
                       VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
				values: [
					newNanoId,
					firebaseId,
					name,
					email,
					is_verified,
					profile_picture_url,
					signInProviderUid
				],
			};
			const result = await db.query(insertUserQuery);
			userInDb = result.rows[0];
		}

		res.status(200).json({
			message: message,
			user: userInDb
		});

	} catch (error) {
		console.error("Erro ao sincronizar a conta do usuário:", error);
		if (error.code === '23505') {
			return res.status(409).json({ message: "Erro de conflito: o e-mail fornecido já está em uso por outra conta." });
		}
		res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
	}
};


exports.updateAccountMetadata = async (req, res) => {
	// O middleware de autenticação já nos deu o 'req.user' com os dados do token
	const { uid, name, picture } = req.user;

	console.log(`Usuário existente com firebaseid ${uid} logou. Sincronizando dados...`);

	try {
		// A query agora apenas atualiza o nome e a foto de perfil
		const updateUserQuery = {
			text: `UPDATE user_T 
                   SET _name = $1, _profile_picture_url = $2 
                   WHERE firebaseid = $3 RETURNING *`,
			values: [name, picture, uid]
		};

		const result = await db.query(updateUserQuery);

		// Esta verificação é uma boa prática. Se não encontrou o usuário para atualizar,
		// algo está errado (talvez ele tenha sido deletado do banco, mas não do Firebase).
		if (result.rowCount === 0) {
			return res.status(404).json({ message: "Usuário não encontrado no sistema para sincronizar." });
		}

		const updatedUser = result.rows[0];
		console.log(`Dados do usuário ${uid} sincronizados com sucesso.`);

		// Retorna o perfil atualizado do nosso banco de dados
		res.status(200).json({
			message: 'Login bem-sucedido e dados sincronizados.',
			user: updatedUser
		});

	} catch (error) {
		console.error("Erro ao sincronizar dados do usuário:", error);
		res.status(500).json({ message: "Erro interno do servidor." });
	}
};