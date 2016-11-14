var fn_index = async(ctx,next)=>{
    ctx.render("index.html",{
        title:"title~~"
    })
}

module.exports = {
    "GET /page/index":fn_index
}