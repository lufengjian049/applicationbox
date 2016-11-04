var register = require("babel-core/register");

register({
    presets:['stage-3']
});
//初始化 插入数据库数据
require("./utils/createdata");