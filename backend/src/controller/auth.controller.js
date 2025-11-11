const sqlite3 = require("sqlite3");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = new sqlite3.Database("../database.db");

const JWT_SECRET = "SUA_CHAVE_SECRETA_SUPER_LONGA";

const register = async (req, res) => {
  const { email, password, nome } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO User (email, password, nome) VALUES (?, ?, ?)`;

    db.run(sql, [email, hashedPassword, nome], function (err) {
      if (err) {
        console.error("Erro no registro:", err);
        return res.status(500).json({ message: "Erro ao registrar." });
      }
      res.status(201).json({
        message: "Usuário criado!",
        userId: this.lastID,
      });
    });
  } catch (error) {
    console.error("Erro no bcrypt:", error);
    res.status(500).json({ message: "Erro ao processar senha." });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  const sql = `SELECT * FROM User WHERE email = ?`;

  db.get(sql, [email], async (err, user) => {
    if (err) {
      console.error("Erro no login (db):", err);
      return res.status(500).json({ message: "Erro no servidor." });
    }
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Senha inválida." });
      }

      const payload = { userId: user.id, email: user.email };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({
        message: "Login bem-sucedido!",
        token: token,
      });
    } catch (error) {
      console.error("Erro no login (bcrypt):", error);
      res.status(500).json({ message: "Erro ao verificar senha." });
    }
  });
};

module.exports = {
  register,
  login,
};
