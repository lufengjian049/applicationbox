var db = require("../db");

module.exports = db.defineModel("questions",{
    title:db.STRING(200),
    answer:{
        type:db.TEXT,
        allowNull:true
    },
    openstatus:db.BOOLEAN,
    endtime:{
        type:db.BIGINT,
        allowNull:true
    }
})