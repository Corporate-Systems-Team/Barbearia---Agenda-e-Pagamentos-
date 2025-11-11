import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";

const db = new sqlite3.Database("./database.sqlite");

export async function register(req, res) {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `INSERT INTO User (email, password) VALUES (?, ?)`;

  db.run(sql, [email, hashedPassword], function (err) {
    if (err) {
      return res.status(500).json({ message: "Erro ao registrar." });
    }
    res.status(201).json({ message: "Usuário criado!" });
  });
}
