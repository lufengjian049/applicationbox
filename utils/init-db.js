const model = require('../models');
model.sync();

console.log('init db ok.');
// process.exit(0);

// model.sync().then(() => {
//     console.log('Init database OK!')
//     process.exit(0)
// }).catch((e) => {
//     console.log(e)
// })