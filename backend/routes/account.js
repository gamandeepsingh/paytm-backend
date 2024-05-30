const express = require('express');
const { getBalance, transferBalance } = require('../controllers/account');
const { authMiddleware } = require('../middleware');

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, transferBalance);
module.exports = router;