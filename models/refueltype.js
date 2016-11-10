var db = require("../db");

module.exports = db.defineModel("refueltype",{
    name:db.STRING(100),
    index:db.INTEGER
})