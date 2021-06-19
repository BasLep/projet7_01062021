const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const userController = require("../controllers/user");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/:id", userController.getOneUser);
router.get("/", userController.getAllUsers);
router.delete("/:id", userController.deleteAccount);
router.put("/:id", userController.modifyAccount);

module.exports = router;
