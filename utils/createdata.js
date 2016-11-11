// require('babel-core/register')({
//     presets: ['stage-3']
// });

//放置 头部 会有加载不到的情况，应放置在另一个文件中

const model = require("../models");

let refueltype = model.refueltype,
    refuelcategory = model.refuelcategory,
    refueling = model.refueling;

(async ()=>{
    var refueltype1 = await refueltype.create({
        name:"92#/93#",
        index:1
    })
    console.log('created: ' + JSON.stringify(refueltype1));
    var refueltype2 = await refueltype.create({
        name:"95#/97#",
        index:2
    })
    console.log('created: ' + JSON.stringify(refueltype2));
    var refueltype3 = await refueltype.create({
        name:"98#",
        index:3
    })
    console.log('created: ' + JSON.stringify(refueltype3));
    var refueltype4 = await refueltype.create({
        name:"0#/柴油",
        index:4
    })
    console.log('created: ' + JSON.stringify(refueltype4));

    // next
    var refuelcategory1 = await refuelcategory.create({
        name:"中国石油",
        index:1
    });
    console.log('created: ' + JSON.stringify(refuelcategory1));
    var refuelcategory2 = await refuelcategory.create({
        name:"中石化",
        index:2
    });
    console.log('created: ' + JSON.stringify(refuelcategory2));

    var list=[
        {price:5.64,cost:200,fuel:35.46,datestr:"2015-12-12"},
        {price:5.66,cost:200,fuel:35.34,datestr:"2015-12-25"},
        {price:5.66,cost:250,fuel:44.17,datestr:"2015-12-27"},
        {price:5.66,cost:200,fuel:35.34,datestr:"2015-01-02"},
        {price:5.54,cost:200,fuel:36.10,datestr:"2015-01-25"},
        {price:5.54,cost:150,fuel:27.08,datestr:"2015-01-28"},
        {price:5.54,cost:100,fuel:18.05,datestr:"2015-01-31"},
        {price:5.54,cost:200,fuel:36.10,datestr:"2015-02-12"},
        {price:5.54,cost:200,fuel:36.10,datestr:"2015-03-05"},
        {price:5.54,cost:200,fuel:36.10,datestr:"2015-03-18"},
        {price:5.53,cost:200,fuel:36.17,datestr:"2015-04-16"},
        {price:5.68,cost:250,fuel:44.01,datestr:"2015-04-28"},
    ];
    for(let item of list){
        await refueling.create({
            "refueltypeId":refueltype1.id,"refuelcategoryId":refuelcategory1.id,"price":item.price,"cost":item.cost,"fuel":item.fuel,createdAt:(new Date(item.datestr))*1
        });
    }
    // list.forEach((item)=>{
    //     await refueling.create({
    //         "type":refueltype1.id,"category":refuelcategory1.id,"price":item.price,"cost":item.cost,"fuel":item.fuel,createdAt:(new Date(item.datestr))*1
    //     });
    // })
    // //next
    // await refueling.create({
    //     "type":refueltype1.id,"category":refuelcategory1.id,"cost":250,"fuel":40,createdAt:(new Date("2016-4-2"))*1
    // });

})();

