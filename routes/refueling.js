// var model = require("../model");
var model = require("../models");
var db = require("../db");
//抛异常情况 try catch

var getList = (modelname,searchparam) =>{
    return async(ctx,next)=>{
        try {
            var data=null;
            if(modelname == "refueling"){
                data = await model[modelname].scope("innertype").findAll(searchparam);
            }else{
                data = await model[modelname].findAll(searchparam);
            }
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

var getRefuelList = async(ctx,next) =>{
    try {
        db.sequelize.query("select *,typename=(select refueltype.name from refueltype as refueltype where refueltype.id = refuellist.type)  from refuelings as refuellist",
                        { type: db.sequelize.QueryTypes.SELECT}).then((lists)=>{
                            console.log(lists);
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
            
        } catch (error) {
            ctx.respData({
                errcode:1000,errmsg:"error"
            })
        }
    }
}

module.exports = {
    "GET /refuel/type":getList("refueltype",{order:[["index"]]}),
    "GET /refuel/category":getList("refuelcategory"),
    "GET /refuel/list":getRefuelList,
    "POST /refuel/add":newFunc("refueling"),
    "POST /refuel/update":updateFunc("refueling")
}