//
var db = require("../db");

module.exports = db.defineModel("audios",{
    name:db.STRING(200),
    path:db.STRING(200),
    duration:db.BIGINT,  //时长
    words:{ //歌词
        type:db.TEXT,
        allowNull:true
    }
    // openstatus:db.BOOLEAN,
    // endtime:{
    //     type:db.BIGINT,
    //     allowNull:true
    // }
})