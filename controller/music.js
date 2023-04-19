const { db } = require("../utils/db");
const http = require("../utils/url");
exports.search = async (req, res) => {
  let key = req.query.keywords;
  const result = await db(
    `SELECT * FROM SONGS WHERE musicName like ? or Singer like ?`,
    [`%${key}%`,`%${key}%`]
  );
  result.forEach((item) => {
    item.musicBg = item.musicBg ? http + item.musicBg : null ;
  });
  res.status(200).json({ status: 200, data: result });
};

exports.musicUrl = async (req, res) => {
  let id = req.query.id;
  const result = await db("SELECT url from songs where musicId= ?", id);
  if (result.length > 0) {
    result[0].url = http + result[0].url;
    res.status(200).json({ status: 200, data: result });
  } else {
    res.status(200).json({ status: 200, data: "" });
  }
};

exports.musicLyric = async (req, res) => {
  let id = req.query.id;
  const result = await db("SELECT lyric from songs where musicId= ?", id);
  res.status(200).json({
    status: 200,
    lrc: result[0] ? result[0] : "",
    tlyric: {
      lyric: "",
    },
  });
};
