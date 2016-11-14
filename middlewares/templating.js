const nunjucks = require("nunjucks");

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {    //views
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}
//给 ctx 添加一个 render方法
function templating(path,opts){
    let env = createEnv(path,opts);
    return async(ctx,next) => {
        ctx.render = (view,model)=>{
            ctx.response.type = "text/html";
            ctx.response.body = env.render(view,Object.assign({},ctx.state || {},model || {}));
        }
        await next();
    }
}

module.exports = templating;

