const express = require("express");
const cors = require("cors");
const app = express();
const clienteRouter = require("./routes/ClienteRoutes.js");
const authRouter = require("./routes/auth.routes.js");

app.use(cors());
app.use(express.json());

app.use("/", clienteRouter);
app.use("/api/auth", authRouter);

app.listen(3001, () => {
  console.log("Server está rodando 3001");
});

module.exports = app;
