# Easy MNIST
Easy mnist allows you to acces the popular mnist dataset.

## Install
```
npm i easy-mnist
```

## Get Started
Here is how you would get a training & testing set.
```js
const dataset = require('easy-mnist').makeData(60000,10000);

mnist.traindata[0].label
mnist.traindata[0].image

mnist.testdata[0].label
mnist.testdata[0].image
```
or you can get the entire 70 000 mnist digits in one set.

```js
const mnist = require('easy-mnist').mnist;

mnist[0].label
mnist[0].image
```

## Format

##### Label format
The index of 1 is the correct label.
```js
console.log(dataset.traindata[0].label);
// outputs:
//  [0,0,0,0,0,1,0,0,0,0]
```
##### Image format
The white values are 1 and black values are 0.
```js
console.log(dataset.traindata[0].image);
// outputs:
//  array (length of 784)
```
## Shuffle
You can also shuffle the training & testing set separately like so:

```js
const dataset = require('easy-mnist').makeData(60000,10000,{shuffle:true});
```
This will not mix the two sets.
