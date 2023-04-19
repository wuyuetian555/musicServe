var express = require("express");
var router = express.Router();
const userValidator = require("../validator/user");
const loginValidator = require("../validator/upload");
const upload = require("../utils/multer").upload;
const userCtroller = require("../controller/users");
const uploadCtroller = require("../controller/upload");
router.post("/register", userValidator.register, userCtroller.register);
router.get("/checkEmail", userValidator.email, userCtroller.checkEmail);
router.get("/sendEmail", userValidator.email, userCtroller.sendEmail);
router.get("/login", userValidator.login, userCtroller.login);
router.post(
  "/upload",
  loginValidator,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  uploadCtroller.upload
);

module.exports = router;
