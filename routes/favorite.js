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
        //TODO:数据插入成功，但是返回出错了
        if(!data.favoritecategoryId){ //不存在category
            var categoryinfo = await model.favoritecategory.create({
                name:data.categoryname
            });
            data.favoritecategoryId = categoryinfo.id;
        }
        var redata = await model.favorite.create(data);
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

var deleteFavorite = async(ctx,next) =>{
    try {
        var data = ctx.request.body;
        var redata = await model.favorite.destroy({
            where:{
                id:data.id
            }
        })
        ctx.respData({
            data:redata
        })
    } catch (error) {
        
    }
}

module.exports = {
    "post add":addFavorite,
    "get list":model.util.getList("favoritecategory",{
        include:[
            {
                model:model.favorite
            }
        ],
    }),
    "get category":model.util.getList("favoritecategory"),
    "post delete":deleteFavorite
}