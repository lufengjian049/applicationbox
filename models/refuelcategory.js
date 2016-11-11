var db = require("../db");

module.exports = db.defineModel("refuelcategory",{
    name:db.STRING(100),
    index:{
        type:db.INTEGER,
        // autoIncrement:true,
        comment:"排序"
    }
})