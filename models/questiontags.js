var db = require("../db");

module.exports = db.defineModel("questiontags",{
    name:db.STRING(200)
})