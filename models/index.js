// scan all models defined in models:
const fs = require('fs');
const db = require('../db');
const util = require("../db/util");

let files = fs.readdirSync(__dirname);

let js_files = files.filter((f)=>{
    return f.endsWith('.js') && !f.startsWith("index");
}, files);

module.exports = {},models={};

for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    models[name] = require(__dirname + '/' + f);
}
// 生成 foreign key
models.refueling.belongsTo(models.refueltype);
models.refueling.belongsTo(models.refuelcategory);

//question 关系
models.questions.hasMany(models.questiontags,{as:"tags"});

//初始配置 util方法传入 models
var utilobj={};
for(let ukey in util){
    utilobj[ukey] = util[ukey](models);
}


module.exports = models;
module.exports.util = utilobj;
module.exports.sync = () => {
    db.sync();
};