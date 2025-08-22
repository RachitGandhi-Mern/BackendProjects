const express = require("express");
const router = express.Router();
const { ask } = require("../Controllers/LegalchatController");

router.post("/ask", ask);

module.exports = router;