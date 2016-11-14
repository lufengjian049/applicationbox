var db = require("../db");

module.exports = db.defineModel("questions",{
    title:db.STRING(200),
    answer:db.TEXT,
    openstatus:db.BOOLEAN,
    endtime:{
        type:db.BIGINT,
        allowNull:true
    }
})