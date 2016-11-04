var db = require("../db");

module.exports = db.defineModel('refuelings', {
    position:db.STRING(200),
    longitude:db.DOUBLE,
    latitude:db.DOUBLE,
    type:db.ID,   //foreign key
    category:db.ID,   //foreign key
    cost:db.DOUBLE,
    fuel:db.DOUBLE,
    mileage:db.DOUBLE
});