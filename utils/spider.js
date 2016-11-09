var http = require("http"),
    https = require("https"),
    fs = require("fs"),
    path = require("path"),
    cheerio = require("cheerio");

var spiderMovie = (index) =>{
    https.get("https://movie.douban.com/top250?start="+index,(res)=>{
        var html = "",
            movies = [];
        res.setEncoding("utf-8");
        res.on("data",(chunck)=>{
            html += chunck;
            // console.log(chunck);
        })

        res.on("end",()=>{
            var $ = cheerio.load(html);
            $(".item").each(function(){  //=> ???
                var picUrl = $('.pic img', this).attr('src');
                var movie = {
                    title: $('.title', this).text(), 
                    star: $('.info .star .rating_num', this).text(), 
                    link: $('a', this).attr('href'), 
                    picUrl: picUrl
                };
                if (movie) {
                    movies.push(movie);
                    console.log("cur movie"+JSON.stringify(movie));
                }
                downImages(picUrl,"./imgs/")
            })
            saveData("./datas/first.json",movies);
            // console.log("end");
        })
    })
}

var downImages = (url,dir)=>{
    if(url){
        https.get(url,(res)=>{
            var data="";
            res.setEncoding("binary");
            res.on("data",(chunck)=>{
                data += chunck;
            })
            res.on("end",()=>{
                fs.writeFile(dir+path.basename(url),data,"binary",(err)=>{
                    if(err){
                        console.log(err);
                    }
                    console.log("download img "+url);
                })
            })
        }).on("error",(err)=>{
            console.log(err);
        })
    }
}

var saveData = (path,movies)=>{
    if(movies.length){
        fs.writeFile(path,JSON.stringify(movies),(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("save data over");
            }
        })
    }
}

spiderMovie(0);