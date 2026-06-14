const express = require("express")
const router = express.Router()
const { register, login, refreshTokenHandler } = require("../controllers/auth")
router.post("/register", register)
router.post("/login", login)
router.post("/refresh", refreshTokenHandler);
module.exports = router