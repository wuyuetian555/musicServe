const { body, query } = require("express-validator");
const { validate } = require("../middleware/validator");
const { db } = require("../utils/db");
exports.register = validate([
  body("password")
    .notEmpty()
    .withMessage("密码不能为空")
    .matches(/^[A-Za-z0-9]{8,15}$/)
    .withMessage("密码格式不对"),
  body("email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不对")
    .custom(async (email) => {
      const result = await db("select email from user where email =?", [email]);
      if (result.length > 0) {
        return Promise.reject("该邮箱已存在");
      }
    }),
]);

exports.email = validate([
  query("email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不对"),
]);

exports.login = validate([
  query("email")
    .notEmpty()
    .withMessage("邮箱账号不能为空")
    .isEmail()
    .withMessage("邮箱账号格式不对"),
  query("password")
    .notEmpty()
    .withMessage("密码不能为空")
    .matches(/^[A-Za-z0-9]{8,15}$/)
    .withMessage("密码格式不对"),
  ,
]);
