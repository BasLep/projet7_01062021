const express = require("express");
const router = express.Router();

const articleController = require("../controllers/article");
const auth = require("../middleware/auth");

router.post("/postarticle", articleController.postArticle);
router.get("/", articleController.getAllArticle);
router.get("/:id", articleController.getOneArticle);

module.exports = router;
