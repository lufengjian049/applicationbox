var model = require("../models");
//post {
    // title:"",
    // answer:"",
    // openstatus: true(open) / false (closed)
    // endtime: 可以为null
    // tags:[
    //     {name:""}
    // ]
// }
var addQuestion = async(ctx,next) =>{
    try {
        var data = ctx.request.body;
        if(!data.openstatus){
            data.endtime = (new Date())*1;  // +new Date
        }
        debugger;
        var redata = await model.questions.create(data,{
            include:[{model:model.questiontags,as:"tags"}]
        });
        ctx.respData({
            data:redata
        });
    } catch (error) {
        ctx.respData({
            errcode:1000,errmsg:"error",
            error
        })
    }
}
//request , pageindex 
var getQuestion  = async(ctx,next) =>{
    try {
        var data = ctx.request.body,
            findParam = {
                include:[
                    {
                        model:model.questiontags,as:"tags",attributes:["name"]
                    }
                ],
                limit:model.util.PAGESIZE,
                offset:(data.pageindex || 1 - 1) * model.util.PAGESIZE,
                order:[["updatedAt","DESC"]]
            };
        model.util.getList("questions",findParam);
        
    } catch (error) {
        
    }
}

module.exports ={
    "POST add":addQuestion,
    "POST list":model.util.getList("questions",(ctx)=>{
        var data = ctx.request.body;
        //post  pageindex search tagname
        return {
                include:[
                    {
                        model:model.questiontags,as:"tags",attributes:["name"],
                        where:{
                            name:{
                                $like:'%'+(data.tagname || "")+'%'
                            }
                        }
                    }
                ],
                limit:model.util.PAGESIZE,
                offset:((data.pageindex || 1) - 1) * model.util.PAGESIZE,
                order:[["updatedAt","DESC"]],
                where:{
                    title:{
                        $like:'%'+ (data.search || "") + '%'
                    }
                }
        };
    }),
    "GET tags":model.util.getList("questiontags",{
        group:"name"
    }),
    // "GET getlistbytag":
}