require("dotenv").config();
const express = require("express");
const router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");

const commentController = require("../controllers/comment");
const protectedRouter = withJWTAuthMiddleware(router, process.env.ACCESS_TOKEN_SECRET);
const isowner = require("../middleware/isOwnerComment");

protectedRouter.post("/postcomment", commentController.postComment);
protectedRouter.get("/:id", commentController.getAllComments);
protectedRouter.get("/onecomment/:id", commentController.getOneComment);
protectedRouter.put("/onecomment/:id", isowner, commentController.modifyComment);
protectedRouter.delete("/onecomment/:id", isowner, commentController.deleteComment);

module.exports = router;
