const { header } = require("express-validator");
const { validate } = require("../middleware/validator");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils/secretKey ");
const loginValidator = validate([
  header("Authorization").custom(async (Authorization) => {
    if (!Authorization) return Promise.reject("请先完成登录");
    let decoded = jwt.verify(Authorization, secretKey);
    if (!decoded) return Promise.reject("请先完成登录");
  }),
]);

module.exports = loginValidator;
