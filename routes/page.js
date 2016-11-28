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
    try {
        var favorites = await model.favoritecategory.findAll({
            include:[
                {
                    model:model.favorite
                }
            ],
            order:[["updatedAt","DESC"],[model.favorite,"updatedAt","DESC"]]
        });
        ctx.render("favorite.html",{
            title:"favorite list",
            lists:favorites
        })
    } catch (error) {
        
    }
}

module.exports = {
    "get index":fn_index,
    "get queslist":fn_questionlist,
    "get favorite":fn_favorite
}