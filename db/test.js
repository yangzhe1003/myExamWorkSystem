require('babel-polyfill');
let managerDB = require('../db/managerDB');

managerDB.getChoice(3).then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
});

