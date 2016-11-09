// var model = require("../model");
var model = require("../models");

//抛异常情况 try catch

var getList = (modelname) =>{
    return async(ctx,next)=>{
        try {
            var data = await model[modelname].findAll();
            ctx.respData({
                data:data
            })
        } catch (error) {
            ctx.respData({
                errcode:1000,errmsg:"error"
            })
        }
    }
}


var addRefuel = async(ctx,next)=>{

}

module.exports = {
    "GET /refuel/type":getList("refueltype"),
    "GET /refuel/category":getList("refuelcategory"),
    "GET /refuel/list":getList("refueling"),
    "POST /refuel/add":addRefuel
}