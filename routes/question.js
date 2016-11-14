var db = require("../db");
var models = db.sequelize.models;
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
        var redata = models.questions.create(data,{
            include:[{model:models.questiontags,as:"tags"}]
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

module.exports ={
    "POST /question/add":addQuestion,
    "GET /question/list":db.util.getList("questions",{
        include:[
            {
                model:models.questiontags,as:"tags",attributes:["name"]
            }
        ]
    })
}