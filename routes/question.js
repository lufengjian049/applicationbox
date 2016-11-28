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
var deleteQuestion = async(ctx,next) =>{
    // 删除 question && questiontags
    try {
        //ctx.params.id
        var redata = await model.questions.destroy({
            where:{
                id:ctx.params.id
            },
            include:[
                {
                    model:model.questiontags,as:"tags",
                }
            ]
        })
        ctx.respData({
            data:redata
        })
    } catch (error) {
        
    }
}

module.exports ={
    "post add":addQuestion,
    "post list":model.util.getList("questions",(ctx)=>{
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
    "get tags":model.util.getList("questiontags",{
        group:"name"
    }),
    "del :id":deleteQuestion
    // "GET getlistbytag":
}