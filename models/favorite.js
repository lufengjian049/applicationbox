var db = require("../db");

module.exports = db.defineModel("favorite",{
    title:db.STRING(200),
    url:db.STRING(200),
    // openstatus:db.BOOLEAN,
    // endtime:{
    //     type:db.BIGINT,
    //     allowNull:true
    // }
})