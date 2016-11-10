var db = require("../db");

module.exports = db.defineModel("refuelcategory",{
    name:db.STRING(100),
    index:db.INTEGER
})