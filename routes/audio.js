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

module.exports = {
    "get categorylist":model.util.getList("audiocategory"),
    "get audiolistbyid":model.util.getList("audios",(ctx)=>{
        //获取链接的param
        var param = ctx.request.param;
        return {
            where:{
                "audiocategoryId":param
            }
        }
    }),
    "post addcategory":model.util.add("audiocategory"),
    "post addaudio":model.util.add("audios"),
    //上传文件
}