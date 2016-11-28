var mdparse = require("node-markdown").Markdown;
var parseMarkDown=async(ctx,next)=>{
    var data = ctx.request.body;
    ctx.respData({
        data:{
            html:mdparse(data.txt)
        }
    })
}

module.exports = {
    "routename":"md",
    "POST parse":parseMarkDown
}