const { Router } = require("express");
const { register, login } = require("../controller/auth.controller.js");

const router = Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
