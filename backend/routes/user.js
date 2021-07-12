require("dotenv").config();
const express = require("express");
const router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");

const userController = require("../controllers/user");
const protectedRouter = withJWTAuthMiddleware(router, process.env.ACCESS_TOKEN_SECRET);
const isuser = require("../middleware/isUser");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
protectedRouter.get("/:id", userController.getOneUser);
protectedRouter.get("/", userController.getAllUsers);
protectedRouter.delete("/:id", isuser, userController.deleteAccount);
protectedRouter.put("/:id", isuser, userController.modifyAccount);

module.exports = router;
