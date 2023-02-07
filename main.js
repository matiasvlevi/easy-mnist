const { readFileSync } = require('fs');

class MNIST {
  constructor() { /* ... */ }
}

MNIST.Load = function Load() {
  let mnist = { data: [] };
  let dataArray = [];

  for (let i = 0; i < 7; i++) {
    let batch = JSON.parse(
        readFileSync(__dirname + '/dataset/mnist_batch_' + i + '.json', 'utf-8')
    );
    mnist.data = mnist.data.concat(batch.data);
  }

  return mnist;
}

MNIST.makeData = function makeData(train_length, test_length, options) {

  const mnist = MNIST.Load();

  let shu = false;
  if (options !== undefined) {
    if (options.shuffle) {
      shu = options.shuffle;
    }
  }
  const dataset = { train: [], test: [] };

  let len = train_length + test_length;
  if (len > 70000) {
    console.error('Please enter values that wont exceed 70 000');
  }

  for (let i = 0; i < train_length; i++) {
    dataset.train.push(mnist.data[i]);
  }

  for (let i = train_length; i < len; i++) {
    dataset.test.push(mnist.data[i]);
  }

  if (shu == true) {
    dataset.train = MNIST.shuffle(dataset.train);
  }

  return dataset;
}

MNIST.makeBatch = function makeBatch(batchCount, options) {

  const mnist = MNIST.Load();

  let shuffle = false;
  let empty = false;
  if (options !== undefined) {
    if (options.shuffle !== undefined) {
      shuffle = options.shuffle;
    }
    if (options.empty !== undefined) {
      empty = options.empty;
    }
  }

  const dataset = { train:[], test: [] };

  let trainCount = 60000;
  let testCount = 10000;
  let totalCount = trainCount + testCount;

  for (let i = 0; i < trainCount / batchCount; i++) {
    let data = { batch: [] }

    for (let j = 0; j < batchCount; j++) {
      let image = mnist.data[i * batchCount + j];
      
      if (empty) image.label.push(0);
      
      data.batch.push(image);
    }

    dataset.train.push(data);

  }

  for (let i = trainCount / batchCount; i < totalCount / batchCount; i++) {
    let data = { batch: [] }

    for (let j = 0; j < batchCount; j++) {
      let image = mnist.data[i * batchCount + j];

      if (empty) image.label.push(0);
      
      data.batch.push(image);
    }

    dataset.test.push(data);

  }

  if (shuffle == true) {
    dataset.train = MNIST.shuffle(dataset.train);
  }

  return dataset;
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
