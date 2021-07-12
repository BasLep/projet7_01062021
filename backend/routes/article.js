require("dotenv").config();
const express = require("express");
const router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");

const articleController = require("../controllers/article");
const protectedRouter = withJWTAuthMiddleware(router, process.env.ACCESS_TOKEN_SECRET);
const isowner = require("../middleware/isOwner");

protectedRouter.post("/postarticle", articleController.postArticle);
protectedRouter.get("/", articleController.getAllArticle);
protectedRouter.get("/:id", articleController.getOneArticle);
protectedRouter.put("/:id", isowner, articleController.modifyArticle);
protectedRouter.delete("/:id", isowner, articleController.deleteArticle);

module.exports = router;
