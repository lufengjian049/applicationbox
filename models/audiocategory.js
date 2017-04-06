//音频 歌单分类
var db = require("../db");

module.exports = db.defineModel("audiocategory",{
    name:db.STRING(200),
    ext:db.STRING(200)
})