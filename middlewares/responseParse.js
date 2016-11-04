// function responseParse(){

//     return async(ctx,next) =>{
//         ctx.respData = (data)=> {
//             ctx.response.body = Object.assign({},{errcode:0,errmsg:""},data);
//             ctx.response.status = 200;
//         };
//         await next(); 
//     }
// }

var responseParse = async(ctx,next) =>{
    ctx.respData = (data)=> {
        ctx.response.body = Object.assign({},{errcode:0,errmsg:""},data);
        ctx.response.status = 200;
    };
    await next(); 
}

module.exports = responseParse;