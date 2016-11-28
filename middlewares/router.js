const fs = require("fs");

function mappingRouter(router,mapping,filename){
    // debugger
    filename = "/"+filename+"/";
    for(let url in mapping){
        if(url == "routename")
            continue;
        if(url.startsWith("GET ")){
            router.get(filename+url.substr(4),mapping[url]);
        }else if(url.startsWith("POST ")){
            router.post(filename+url.substr(5),mapping[url]);
        }else{
            console.log('error');
        }
    }
}

//自定义 route 名，可以在modal中添加属性  routename
function addController(router,dir){
    var files = fs.readdirSync(dir);

    //过滤文件
    var js_files = files.filter((file)=>{
        return file.endsWith(".js");
    })
    for(var jsfile of js_files){
    //导入
        let mapping = require(dir+"/"+jsfile),
            filename = mapping.routename || jsfile.slice(0,-3);
        mappingRouter(router,mapping,filename);
    }
}

module.exports = (rootdir,dir) =>{
    let controller_dir = dir || "routes",
        router = require("koa-router")();
    addController(router,rootdir+"/"+controller_dir);
    return router.routes();
}