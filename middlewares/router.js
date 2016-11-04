const fs = require("fs");

function mappingRouter(router,mapping){
    for(let url in mapping){
        if(url.startsWith("GET ")){
            router.get(url.substr(4),mapping[url]);
        }else if(url.startsWith("POST ")){
            router.post(url.substr(5),mapping[url]);
        }else{
            console.log('error');
        }
    }
}

function addController(router,dir){
    var files = fs.readdirSync(dir);

    //过滤文件
    var js_files = files.filter((file)=>{
        return file.endsWith(".js");
    })
    for(var jsfile of js_files){
    //导入
        let mapping = require(dir+"/"+jsfile);
        mappingRouter(router,mapping);
    }
}

module.exports = (rootdir,dir) =>{
    let controller_dir = dir || "routes",
        router = require("koa-router")();
    addController(router,rootdir+"/"+controller_dir);
    return router.routes();
}