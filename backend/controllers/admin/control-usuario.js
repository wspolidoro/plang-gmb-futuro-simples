const Usuarios = require('../../models/table_users');
const database = require('../../db/db');

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;

        const usuario = await Usuarios.findOne({ raw: true });

        try {
            if (usuario && password === usuario.password) {
                // Cria o token JWT
                const token = jwt.sign(
                    { id: usuario.id, email: usuario.email },
                    process.env.BETTER_AUTH_SECRET || 'secret',
                    { expiresIn: '1d' }
                );
                return res.json({ success: true, message: 'Usuário autenticado com sucesso', token: token });
            }
        } catch (err) {
            console.log(err)
        }


        res.json({ success: false, message: "não encontrado" });
    }
}
