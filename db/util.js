module.exports = {
    getList:(models)=>(modelname,searchparamfn)=>{
        // return (modelname,searchparam)=>{
            var model = models[modelname];
            return async(ctx,next)=>{
                try {
                    var data=null,
                        searchparam= typeof searchparamfn === "function" ? searchparamfn(ctx) : searchparamfn;

                    data = await model.findAll(searchparam);
                    ctx.respData({
                        data:data
                    })
                } catch (error) {
                    ctx.respData({
                        errcode:1000,errmsg:"error",
                        error
                    })
                }
            }
        // }
    },
    //每页显示的数量
    PAGESIZE:10
}