var model = require("../models");
var audioconfig = require("../config/audioconfig");

var fn_index = async(ctx,next)=>{
    var tags = await model.questiontags.findAll({group:"name"});
    ctx.render("index.html",{
        title:"title~~",
        tags:tags,
        pagename:"index"
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
        list:lists,
        pagename:"question"
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
            lists:favorites,
            pagename:"favorite"
        })
    } catch (error) {
        
    }
}



var fn_audio = async(ctx,next) =>{
    var audiodata = _getAudioData();
    console.log(audiodata.audiocate)
    ctx.render("audio.html",{
        title:"audio list",
        pagename:"audio",
        cate:audiodata.audiocate,
        data:audiodata.audiodata
    })
}
var _getAudioData = () => {
    var audiocate=[],
        audiodata = [];
    for(var key in audioconfig){
        audiocate.push({
            alias:audioconfig[key].alias,
            key:key
        });
        audiodata.push({
            key,
            music:audioconfig[key].music
        });
    }
    return {
        audiocate,
        audiodata
    }
}

var fn_upload = async(ctx,next) =>{
    ctx.render("upload.html",{
        title:"upload",
        pagename:"upload"
    })
}
module.exports = {
    "get ":fn_index,
    "get queslist":fn_questionlist,
    "get favorite":fn_favorite,
    "get audio":fn_audio,
    "get upload":fn_upload,
}