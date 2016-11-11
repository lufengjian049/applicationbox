var db = require("../db");

module.exports = db.defineModel("refueltype",{
    name:db.STRING(100),
    index:{
        type:db.INTEGER, 
        // autoIncrement: true,  //自增列
        comment:"排序",  //描述
    }
})