var formidable = require('formidable'),
    path = require('path'),
    fs = require('fs');

// var formParse = require("co-busboy");
var asyncBusboy = require("async-busboy");

// isotropy-busboy

// async-busboy

// co-busboy

var fn_upload = async(ctx,next)=>{
    try {
        const {files, fields} = await asyncBusboy(ctx.req);
        var filenames = [];
        files.forEach((file) =>{
            var filename = file.filename,
                uploaddir = path.join(__dirname , "../statics"),
                fileExt = filename.substring(filename.lastIndexOf('.')),
                newfilename = new Date().getTime() + fileExt,
                targetdir='',middledir='';
            switch (true) {
                case ('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) > -1:
                    middledir = "imgs";
                    break;
                case ('.mp3').indexOf(fileExt.toLowerCase()) > -1:
                    middledir = "audio";
                    break;    
                case ('.mp4').indexOf(fileExt.toLowerCase()) > -1:
                    middledir = "video";
                    break;
                default:
                    middledir = "upload";
                    break;
            };
            targetdir = path.join(uploaddir,middledir);
            //检查目标存放目录是否存在
            if (!fs.existsSync(targetdir)) {
                fs.mkdir(targetdir);
            }
            //生成存储路径 这里必须为绝对路径
            var stream = fs.createWriteStream(path.join(targetdir,newfilename));
            filenames.push({
                name:filename.replace(fileExt,""),
                path:path.join(middledir,newfilename)
            });
            //写入文件流-- file是一个read流
            file.pipe(stream);
        })
        if(filenames.length > 0){
            ctx.respData({data:{
                files:filenames
            }});
        }
    } catch (error) {
        ctx.respData({errcode:1001});
        console.log(error);
    }
}

module.exports = {
    "post single":fn_upload
}