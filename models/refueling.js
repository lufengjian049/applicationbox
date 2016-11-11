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