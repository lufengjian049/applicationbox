var db = require("../db");

var typemodel = require("./refueltype");

module.exports = db.defineModel('refuelings', {
    position:{
        type:db.STRING(200),
        allowNull:true
    },
    longitude:{
        type:db.DOUBLE,
        allowNull:true
    },
    latitude:{
        type:db.DOUBLE,
        allowNull:true
    },
    type:db.ID,   //foreign key
    category:db.ID,   //foreign key
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
//                 {model:typemodel}
//             ]
//         }
//     }
// }