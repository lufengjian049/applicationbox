const Koa = require("koa");

const middlewares = require("./middlewares");

const app = new Koa();

const isProduction = process.env.NODE_ENV == "production";

//log && time
app.use(middlewares.log);

//处理静态资源
app.use(middlewares.staticFile("/statics/",__dirname+"/statics"));

//处理post请求，添加request.body来获取请求参数
app.use(middlewares.bodyParser());

//添加 统一处理返回json数据的中间件,给ctx绑定 respData 方法统一返回
app.use(middlewares.respParse);

//负责给ctx添加render方法，以便使用nunjucks模板
app.use(middlewares.templating("views",{
    noCache:!isProduction,
    watch:!isProduction
}))

//页面路由处理逻辑 --- 将 router中间件移到文件内部后，__dirname获取到的是当前router文件的目录，而不是根目录，需要传递进去
app.use(middlewares.router(__dirname));

//端口监听
app.listen(8090);
console.log('server listen at 8090');