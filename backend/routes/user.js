const express = require("express");
const { UserSignup, UserUpdate, UserFilter, UserLogin } = require("../controllers/user");
const { authMiddleware } = require("../middleware");
const router = express.Router();

router.post("/signup", UserSignup);
router.post("/signin",UserLogin);
router.put("/update", authMiddleware, UserUpdate);
router.get('/find', UserFilter);
module.exports = router;
