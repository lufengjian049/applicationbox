const path = require("path");
const mime = require("mime");
const fs = require("mz/fs");

//url /statics/
//dir __dirname + /statics
function staticFiles(url,dir){
    return async(ctx,next) =>{
        let rpath = ctx.request.path;
        //是否是请求静态资源
        if(rpath.startsWith(url)){
            let fpath = path.join(dir,rpath.substr(url.length));
            if(await fs.exists(fpath)){
                //获取文件的mime
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(fpath);
            }else{
                ctx.response.status =  404;
            }
        }else{
            await next();
        }
    }
}

module.exports = staticFiles;