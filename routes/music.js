var express = require("express");
var router = express.Router();
const musicController = require("../controller/music");
router.get("/searchMusic", musicController.search);
router.get("/musicUrl", musicController.musicUrl);
router.get("/musicLyric", musicController.musicLyric);
module.exports = router;
