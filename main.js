require('mathjs');
const fs = require('fs');

let mnist = {};
let dataArray = [];
for (let i = 0; i < 7;i++) {
    let batch = JSON.parse(fs.readFileSync(__dirname+'/dataset/mnist_batch_'+i+'.json', 'utf-8'));
    dataArray = dataArray.concat(batch.data);
}
mnist.data = dataArray;
function shuffle(arr) {
    let currentId = arr.length;

    while (0 !== currentId) {

      let randId = Math.floor(Math.random() * currentId);
      currentId -= 1;

      let temp = arr[currentId];
      arr[currentId] = arr[randId];
      arr[randId] = temp;
    }
    return arr;
}
function makeData(train,test,options) {
    let shu = false;
    if (options !== undefined) {
        if (options.shuffle) {
            shu = options.shuffle;
        }
    }
    let tr = [];
    let te = [];
    let len = train+test;
    if (len > 70000) {
        console.error('Please enter values that wont exceed 70 000');
    }
    for(let i = 0; i < train; i++) {
        tr.push(mnist.data[i]);
    }
    for(let i = train; i < len; i++) {
        te.push(mnist.data[i]);
    }
    if (shu == true) {
        tr = shuffle(tr);
        te = shuffle(te);
    }
    return {traindata:tr,testdata:te};
}
module.exports = {
    makeData: makeData,
    mnist: mnist.data
}
