var db = require("../db");

module.exports = db.defineModel("refueltype",{
    name:db.STRING(100)
})