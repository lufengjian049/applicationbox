var model = require("../models");

var addcategory = async(ctx,next) =>{
    try {
        var data = ctx.request.body;
        var redata = await model.audiocategory.create(data);
        ctx.respData({
            data:{}
        })
    } catch (error) {
        ctx.respData({
            errcode:1000,errmsg:"error",
            error
        })
    }
}

var deleteCategory = async(ctx,next) =>{
    //是否 删除分类下的 歌曲
    try {
        let delline = await model.audiocategory.destroy({
            where:{
                id:ctx.params.id
            },
        })
        if(delline > 0){
            ctx.respData({
                data:delline
            })
        }else{
            new Error('error')
        }
    } catch (error) {
        ctx.respData({
            errcode:1000,errmsg:"error",
            error
        })
    }
}

module.exports = {
    "get categorylist":model.util.getList("audiocategory",(ctx) =>{
        return {
            order:[['updatedAt',"DESC"]]
        }
    }),
    "post audiolistbyid":model.util.getList("audios",(ctx)=>{
        //获取链接的param
        var param = ctx.request.body;
        return {
            where:{
                "audiocategoryId":param.id
            },
            order:[["updatedAt"]]
        }
    }),
    "post addcategory":model.util.add("audiocategory"),
    "post addaudio":model.util.add("audios"),
    "del :id":deleteCategory
    //上传文件
}