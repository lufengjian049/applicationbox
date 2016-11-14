module.exports = {
    getList:(models)=>(modelname,searchparam)=>{
        // return (modelname,searchparam)=>{
            var model = models[modelname];
            return async(ctx,next)=>{
                try {
                    var data=null;
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
    }
}