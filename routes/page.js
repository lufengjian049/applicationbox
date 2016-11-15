var db = require("../db");
var models = db.sequelize.models;
var fn_index = async(ctx,next)=>{
    var tags = await models.questiontags.findAll({group:"name"});
    ctx.render("index.html",{
        title:"title~~",
        tags:tags
    })
}

module.exports = {
    "GET /page/index":fn_index
}