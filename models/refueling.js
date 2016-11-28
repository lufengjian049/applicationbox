var db = require("../db");

// var typemodel = require("./refueltype");

module.exports = db.defineModel('refueling', {
    position:{
        type:db.STRING(200),
        allowNull:true
    },
    longitude:{
        type:db.DOUBLE,
        allowNull:true,
        comment:""
    },
    latitude:{
        type:db.DOUBLE,
        allowNull:true
    },
    // type:{
    //     type:db.ID,
    //     // field:"type",
    //     // references:{
    //     //     model:db.sequelize.models.refueltype,
    //     //     key:"type"
    //     // }
    // },   //foreign key
    // category:db.ID,   //foreign key
    price:db.DOUBLE,
    cost:db.DOUBLE,
    fuel:db.DOUBLE,
    mileage:{
        type:db.DOUBLE,
        allowNull:true
    }
});

// ,{
//     scopes:{
//         innertype:{
//             include:[
//                 {model:typemodel} //获取模块  db.sequelize.models.refueltype 
//             ]
//         }
//     }
// }

// 时间
// 地点 position
// 经度 longitude
// 纬度 latitude
// 型号(93#,95#) type --foreign key
// 品类(石油，中石化，海油) category --foreign key
// 单价 price
// 本次费用 cost 
// 本次油量 fuel
// 里程？？ mileage