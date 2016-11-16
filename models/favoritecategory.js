var db = require("../db");

module.exports = db.defineModel("favoritecategory",{
    name:db.STRING(200)
})