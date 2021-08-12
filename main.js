const fs = require('fs');

let mnist = {};
let dataArray = [];
for (let i = 0; i < 7; i++) {
  let batch = JSON.parse(fs.readFileSync(__dirname + '/dataset/mnist_batch_' + i + '.json', 'utf-8'));
  dataArray = dataArray.concat(batch.data);
}
mnist.data = dataArray;






class MNIST {
  constructor() {
    this.data = mnist.data;
  }
}

MNIST.makeData = function makeData(train, test, options) {
  let shu = false;
  if (options !== undefined) {
    if (options.shuffle) {
      shu = options.shuffle;
    }
  }
  let tr = [];
  let te = [];
  let len = train + test;
  if (len > 70000) {
    console.error('Please enter values that wont exceed 70 000');
  }
  for (let i = 0; i < train; i++) {
    tr.push(mnist.data[i]);
  }
  for (let i = train; i < len; i++) {
    te.push(mnist.data[i]);
  }
  if (shu == true) {
    tr = MNIST.shuffle(tr);
    te = MNIST.shuffle(te);
  }
  return { traindata: tr, testdata: te };
}

MNIST.makeBatch = function makeBatch(batchCount, options) {
  let shu = false;
  let empty = false;
  if (options !== undefined) {
    if (options.shuffle !== undefined) {
      shu = options.shuffle;
    }
    if (options.empty !== undefined) {
      empty = options.empty;
    }
  }
  let train_data = [];
  let test_data = [];

  let trainCount = 60000;
  let testCount = 10000;
  let totalCount = trainCount + testCount;

  for (let i = 0; i < trainCount / batchCount; i++) {
    let data = {
      batch: []
    }
    for (let j = 0; j < batchCount; j++) {
      let index = i * batchCount + j;
      let image = mnist.data[index];
      if (empty) {
        image.label.push(0);
      }
      data.batch.push(image);
    }
    train_data.push(data);

  }
  for (let i = trainCount / batchCount; i < totalCount / batchCount; i++) {
    let data = {
      batch: []
    }
    for (let j = 0; j < batchCount; j++) {
      let index = i * batchCount + j;
      let image = mnist.data[index];
      if (empty) {
        image.label.push(0);
      }
      data.batch.push(image);
    }
    test_data.push(data);

  }
  if (shu == true) {
    train_data = MNIST.shuffle(train_data);
    te = MNIST.shuffle(test_data);
  }
  return { traindata: train_data, testdata: test_data };
}
MNIST.shuffle = function shuffle(arr) {
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



module.exports = MNIST;