const { db } = require("../utils/db");
const jwt = require("jsonwebtoken");
const { SMTPClient } = require("emailjs");
const md5 = require("md5");

const { secretKey } = require("../utils/secretKey ");
exports.register = async (req, res) => {
  const result = await db(
    "SELECT EMAIL FROM EMAIL WHERE EMAIL =? AND CAPTCHA =?",
    [req.body.email, Number(req.body.captcha)]
  );
  if (result.length > 0) {
    const result = await db("INSERT INTO user set ?", {
      password: md5(req.body.password),
      email: req.body.email,
    });
    if (result.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "success" });
    }
  } else {
    res.status(200).json({
      status: 400,
      message: "邮箱验证码不对",
      errors: "邮箱验证码不对",
    });
  }
};

exports.checkEmail = async (req, res) => {
  const result = await db("SELECT EMAIL FROM USER WHERE EMAIL=?", [
    req.query.email,
  ]);
  if (result.length > 0) {
    res.status(200).json({ status: 400, message: "该邮箱已存在" });
  } else {
    res.status(200).json({ status: 200, message: "该邮箱可用" });
  }
};
exports.sendEmail = async (req, res) => {
  let r = Math.random().toFixed(4).split(".")[1];
  let client = new SMTPClient({
    user: "1210875592",
    password: "qivttxzhwqfuffic",
    host: "smtp.qq.com",
    ssl: true,
  });

  client.send(
    {
      text: r,
      from: "1210875592@qq.com",
      to: req.query.email,
      subject: "邮箱验证码",
    },
    async (err, message) => {
      if (!err) {
        const result = await db("SELECT EMAIL FROM EMAIL WHERE EMAIL=?", [
          req.query.email,
        ]);

        if (result.length == 0) {
          await db("INSERT INTO EMAIL SET ?", {
            email: req.query.email,
            captcha: r,
          });
        } else {
          await db("UPDATE EMAIL SET captcha=? WHERE EMAIL=? ", [
            r,
            req.query.email,
          ]);
        }
        res.json({ status: 200, message: "验证码成功发送" });
      } else {
        res.status(401).json({ message: "验证码发送失败" });
      }
    }
  );
};

exports.login = async (req, res) => {
  const result = await db(
    "SELECT EMAIL,PASSWORD FROM USER WHERE EMAIL=? AND PASSWORD=?",
    [req.query.email, md5(req.query.password)]
  );
  if (result.length > 0) {
    const token = jwt.sign({ user: req.query.email }, secretKey);

    res.json({ status: 200, message: "登录成功", token });
  } else {
    res.status(401).json({ message: "邮箱或密码错误" });
  }
};
