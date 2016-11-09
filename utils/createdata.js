// require('babel-core/register')({
//     presets: ['stage-3']
// });

//放置 头部 会有加载不到的情况，应放置在另一个文件中

const model = require("../models");

let refueltype = model.refueltype,
    refuelcategory = model.refuelcategory;

(async ()=>{
    var refueltype1 = await refueltype.create({
        name:"92#/93#",
        order:1
    })
    console.log('created: ' + JSON.stringify(refueltype1));
    var refueltype2 = await refueltype.create({
        name:"95#/97#",
        order:2
    })
    console.log('created: ' + JSON.stringify(refueltype2));
    var refueltype3 = await refueltype.create({
        name:"98#",
        order:3
    })
    console.log('created: ' + JSON.stringify(refueltype3));
    var refueltype4 = await refueltype.create({
        name:"0#/柴油",
        order:4
    })
    console.log('created: ' + JSON.stringify(refueltype4));
})();


(async () => {
    var refuelcategory1 = await refuelcategory.create({
        name:""
    });
    console.log('created: ' + JSON.stringify(refuelcategory1));
    var refuelcategory2 = await refuelcategory.create({
        name:""
    });
    console.log('created: ' + JSON.stringify(refuelcategory2));
    var refuelcategory3 = await refuelcategory.create({
        name:""
    });
    console.log('created: ' + JSON.stringify(refuelcategory3));
    var refuelcategory4 = await refuelcategory.create({
        name:""
    });
    console.log('created: ' + JSON.stringify(refuelcategory4));
})();

