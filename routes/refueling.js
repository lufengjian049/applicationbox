// var model = require("../model");
var model = require("../models");
//抛异常情况 try catch

var getRefuelList = async(ctx,next) =>{
    try {
        var data = await model.refueling.findAll({ include: [ {model:model.refueltype,attributes:["name"]},{model:model.refuelcategory,attributes:["name"]}] });
        ctx.respData({
            data:data
        })
    } catch (error) {
        ctx.respData({
            errcode:1000,errmsg:"error",
            error
        })
    }
}

var newFunc = (modelname) =>{
    return async(ctx,next) =>{
        try {
            var data = ctx.request.body;
            var redata = await model[modelname].create(data);
            console.log('create data:'+JSON.stringify(redata));
            ctx.respData({
                data:redata
            });
        } catch (error) {
            ctx.respData({
                errcode:1000,errmsg:"error"
            })
        }
    }
}

var updateFunc = (modelname) =>{
    return async(ctx,next) =>{
        try {
            var data = ctx.request.body;
            // debugger
            var redata = await model[modelname].update(data.update,{where:data.where,individualHooks:true});  //update isNewRecord 还是true????
            //返回 受影响的行数 返回 [1]
            if(redata && Array.isArray(redata) && redata[0] > 0){
                redata = await model[modelname].findOne({where:data.where});
                ctx.respData({
                    data:redata
                });
            }
        } catch (error) {
            ctx.respData({
                errcode:1000,errmsg:"error",
                error
            })
        }
    }
}

module.exports = {
    "GET type":model.util.getList("refueltype",{order:[["index"]]}),
    "GET category":model.util.getList("refuelcategory",{order:[["index"]]}),
    "GET list":model.util.getList("refueling",{
        include: [ 
            {model:model.refueltype,attributes:["name"]},
            {model:model.refuelcategory,attributes:["name"]}
        ],
        order:[
            ["createdAt"]
        ]
    }),
    "POST add":newFunc("refueling"),
    "POST update":updateFunc("refueling")
}