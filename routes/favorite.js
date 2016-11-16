var model = require("../models");

// post title url favoritecategoryId categoryname
var addFavorite = async(ctx,next)=>{
    try {
        var data = ctx.request.body;
            // categorycount = await model.favoritecategory.count({
            //     where:{
            //         id:data.favoritecategoryId
            //     }
            // })
        // if(data.favoritecategoryId){ //已存在的category
            
        if(!data.favoritecategoryId){ //不存在category
            var categoryinfo = await model.favoritecategory.create({
                name:data.categoryname
            });
            data.favoritecategoryId = categoryinfo.id;
        }
        var redata = await model.favorite.create(data);
        ctx.respData({
            data:redata
        })
    } catch (error) {
        ctx.respData({
            errcode:1000,errmsg:"error",
            error
        })
    }
}

module.exports = {
    "POST /favorite/add":addFavorite
}