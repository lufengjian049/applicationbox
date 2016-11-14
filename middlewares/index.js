var router = require("./router");
var respParse = require("./responseParse");
var bodyParser = require("koa-bodyparser");
var log = require("./log");
var templating = require("./templating");
var staticFile = require("./static_files");
module.exports = {
    router,
    respParse,
    bodyParser,
    log,
    templating,
    staticFile
}