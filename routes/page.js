var model = require("../models");
var fn_index = async(ctx,next)=>{
    var tags = await model.questiontags.findAll({group:"name"});
    ctx.render("index.html",{
        title:"title~~",
        tags:tags
    })
}

var fn_questionlist = async(ctx,next)=>{
    var lists = await model.questions.findAll({
        include:[
            {
                model:model.questiontags,as:"tags",attributes:["name"]
            }
        ],
        order:[["updatedAt","DESC"]]
    });
    ctx.render("questionlist.html",{
        title:"question list",
        list:lists
    })
}

var fn_favorite = async(ctx,next)=>{
    
    ctx.render("favorite.html",{
        title:"favorite list"
    })
}

module.exports = {
    "GET /page/index":fn_index,
    "GET /page/queslist":fn_questionlist,
    "GET /page/favorite":fn_favorite
}