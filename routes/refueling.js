// var model = require("../model");
var model = require("../models");

//抛异常情况 try catch
var getRefuelType=async(ctx,next)=>{
    // ctx.response.type = "";
    // var data = await model.refueltype.findAll();
    try{
        var data = await model.refueltype.findAll();
        ctx.respData({
            data:data
        })
    }
    catch(err){
        ctx.respData({
            errcode:1000,errmsg:"error"
        })
    }
}

var getRefuelCategory=async(ctx,next)=>{

}

module.exports = {
    "GET /refuel/type":getRefuelType,
    "GET /refuel/category":getRefuelCategory
}