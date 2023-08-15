
// yarn-module2/index.js
const yarnModule1 = require('yarn-module1');

function yarnModule2() {
    console.log('yarn-module2');
}

yarnModule1();
yarnModule2();

module.exports = yarnModule2;
