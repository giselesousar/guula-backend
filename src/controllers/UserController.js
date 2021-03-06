const crypto = require('crypto');
const connection = require('../database/connection');
var SHA256 = require("crypto-js/sha256");

module.exports = {
  async create(request, response) {
    const { nome, senha_p, email_p } = request.body;

    //const id = crypto.randomBytes(4).toString('HEX');

    const email_cadastrado = await connection('usuarios').where('email', email_p).select('email').first();

    if (email_cadastrado) {
      return response.status(401).json({ error: "email já existe !", error2: email_cadastrado });
    }

    const senha = SHA256(senha_p).toString();
    const email = SHA256(email_p).toString();

    await connection('usuarios').insert({
      //id,
      nome,
      senha,
      email
    })

    return response.json({ "staus": "OK" });
  },

  async index(request, response) {
    const usuarios = await connection('usuarios').select('*');

    return response.json(usuarios);
  },

  async login(request, response) {
    const { senha_p, email_p } = request.body;
    const email = SHA256(email_p).toString();
    const senha_comp = SHA256(senha_p).toString();
    const id_senha = await connection('usuarios').where('email', email).select('id', 'senha').first();

    if (!id_senha) {
      return response.status(401).json({ error: "Email não cadastrado!" });
    }

    if (id_senha['senha'] != senha_comp) {

      return response.status(401).json({ error: "Senha incorreta!" });

    }

    return response.json(id_senha['id']);

  },
  async getUserByEmail(request, response) {
    const { email } = request.params;
    const email_cadastrado = await connection('usuarios').where('email', SHA256(email).toString()).select('email').first();

    if (!email_cadastrado) {
      return response.status(200).json({ error: "email não existe !" });
    }
    else {
      return response.status(200).json({ message: "OK" });
    }
  },
  async changePassword(request, response) {
    const { senha_p, email_p } = request.body;
    const email = SHA256(email_p).toString();
    const senha = SHA256(senha_p).toString();
    await connection('usuarios').where('email', email).update({senha: senha});
    return response.status(200).json({ message: "OK" });
  }
}
