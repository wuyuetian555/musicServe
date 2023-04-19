const { db } = require("../utils/db");
const jwt = require("jsonwebtoken");

const handlerPath = (path) => {
  const str = path.replaceAll(/\\/g, "/").split("/");
  str.splice(0, 1);
  return str.join("/");
};
exports.upload = async (req, res) => {
  let obj = { ...JSON.parse(req.body.data) };
  obj.url = handlerPath(req.files.file[0].path);

  if (req.files.image) {
    obj.musicBg = handlerPath(req.files.image[0].path);
  }
  obj.musicId = "th" + Date.now();
  const result = await db("INSERT INTO SONGS SET ?", obj);
  if (result.affectedRows > 0) {
    res.status(200).json({ status: 200, message: "success" });
  } else {
    res.status(401).json({ status: 200, message: "fail" });
  }
};
