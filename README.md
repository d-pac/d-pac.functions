[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

# d-pac.functions

## Installation

```sh
$ npm install d-pac.functions
```

## Usage

```js
const funx = require('d-pac.functions');

funx.stat.square(10); //100
funx.pm.reliability(2.6246692913372702, 0.7615773105863908);// 0.9158064516129032
```

```js
const stat = require('d-pac.functions/stat');
stat.square(10); //100
```

```js
const pm = require('d-pac.functions/pm');
pm.reliability(2.6246692913372702, 0.7615773105863908);// 0.9158064516129032
```

## API

<a name="stat"></a>
## stat : <code>object</code>
**Kind**: global namespace  

* [stat](#stat) : <code>object</code>
    * [.square(value)](#stat.square) ⇒ <code>Number</code>
    * [.sum(list, [f])](#stat.sum) ⇒ <code>Number</code>
    * [.mean(list, [f])](#stat.mean) ⇒ <code>Number</code>
    * [.variance(list, [f])](#stat.variance) ⇒ <code>Number</code>
    * [.sd(list, [f])](#stat.sd) ⇒ <code>Number</code>
    * [.rms(list, [f])](#stat.rms) ⇒ <code>Number</code>
    * [.median(list, [f])](#stat.median) ⇒ <code>Number</code>

<a name="stat.square"></a>
### stat.square(value) ⇒ <code>Number</code>
Squares a number

**Kind**: static method of <code>[stat](#stat)</code>  

| Param | Type |
| --- | --- |
| value | <code>Number</code> | 

**Example**  
```js
stat.square(10); //100
```
<a name="stat.sum"></a>
### stat.sum(list, [f]) ⇒ <code>Number</code>
Addition of a sequence of numbers - ∑

**Kind**: static method of <code>[stat](#stat)</code>  
**See**: https://en.wikipedia.org/wiki/Summation  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Array</code> | set of numbers |
| [f] | <code>function</code> | (optional) function used to retrieve the value |

**Example**  
```js
stat.sum([1, 2, 3, 5, 8 ]); //19
```
**Example**  
```js
stat.sum([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //19
```
<a name="stat.mean"></a>
### stat.mean(list, [f]) ⇒ <code>Number</code>
Arithmetic mean, sum of a sequence of numbers divided by sequence length

**Kind**: static method of <code>[stat](#stat)</code>  
**See**: https://en.wikipedia.org/wiki/Mean  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Array</code> | set of numbers |
| [f] | <code>function</code> | (optional) function used to retrieve the value |

**Example**  
```js
stat.mean([1, 2, 3, 5, 8 ]); //3.8
```
**Example**  
```js
stat.mean([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //3.8
```
<a name="stat.variance"></a>
### stat.variance(list, [f]) ⇒ <code>Number</code>
The distance between numbers in a set

**Kind**: static method of <code>[stat](#stat)</code>  
**See**: https://en.wikipedia.org/wiki/Variance  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Array</code> | set of numbers |
| [f] | <code>function</code> | (optional) function used to retrieve the value |

**Example**  
```js
stat.variance([1, 2, 3, 5, 8 ]); //6.16
```
**Example**  
```js
stat.variance([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //6.16
```
<a name="stat.sd"></a>
### stat.sd(list, [f]) ⇒ <code>Number</code>
Standard deviation - σ

**Kind**: static method of <code>[stat](#stat)</code>  
**See**: https://en.wikipedia.org/wiki/Standard_deviation  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Array</code> | set of numbers |
| [f] | <code>function</code> | (optional) function used to retrieve the value |

**Example**  
```js
stat.sd([1, 2, 3, 5, 8 ]); //2.4819347291981715
```
**Example**  
```js
stat.sd([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //2.4819347291981715
```
<a name="stat.rms"></a>
### stat.rms(list, [f]) ⇒ <code>Number</code>
Root mean square, quadratic mean

**Kind**: static method of <code>[stat](#stat)</code>  
**See**: https://en.wikipedia.org/wiki/Root_mean_square  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Array</code> | set of numbers |
| [f] | <code>function</code> | (optional) function used to retrieve the value |

**Example**  
```js
stat.rms([1, 2, 3, 5, 8 ]); //4.538722287164087
```
**Example**  
```js
stat.rms([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //4.538722287164087
```
<a name="stat.median"></a>
### stat.median(list, [f]) ⇒ <code>Number</code>
Returns the median of the set

**Kind**: static method of <code>[stat](#stat)</code>  
**See**: https://en.wikipedia.org/wiki/Median  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Array</code> | set of numbers |
| [f] | <code>function</code> | (optional) function used to retrieve the value |

**Example**  
```js
stat.median([2, 5, 19, 3, -100]); // 3
```
**Example**  
```js
stat.median([{v:2}, {v:5}, {v:19}, {v:3}, {v:-100}], (item)=> item.v); // 3
```

<a name="pm"></a>
## pm : <code>object</code>
**Kind**: global namespace  

* [pm](#pm) : <code>object</code>
    * [.reliability(sd, rmse)](#pm.reliability) ⇒ <code>number</code>
    * [.reliabilityFunctor(getAbility, getSE)](#pm.reliabilityFunctor) ⇒ <code>function</code>
    * [.rasch(a, b)](#pm.rasch) ⇒ <code>number</code>
    * [.fisher(aF, bF, [digits])](#pm.fisher) ⇒ <code>number</code>

<a name="pm.reliability"></a>
### pm.reliability(sd, rmse) ⇒ <code>number</code>
Overall consistency of a measure

**Kind**: static method of <code>[pm](#pm)</code>  
**Returns**: <code>number</code> - - The reliability  

| Param | Type | Description |
| --- | --- | --- |
| sd | <code>number</code> | Standard deviation |
| rmse | <code>number</code> | RMS of the SE |

**Example**  
```js
pm.reliability(4, 2); //0.75
```
<a name="pm.reliabilityFunctor"></a>
### pm.reliabilityFunctor(getAbility, getSE) ⇒ <code>function</code>
Creates a function by taking two getters, which can be used to calculate the reliability of a set of values and SE's

**Kind**: static method of <code>[pm](#pm)</code>  
**Returns**: <code>function</code> - - Function to be used on a list to calculate the reliability  

| Param | Type | Description |
| --- | --- | --- |
| getAbility | <code>function</code> | getter for ability |
| getSE | <code>function</code> | getter for standard error |

**Example**  
```js
const list = [{v:1, se:4}, {v:2, se:2}, {v:3, se:0}, {v:5, se:0.45}, {v:8, se:3}];
const f = pm.reliabilityFunctor((item)=>item.v, (item)=>item.se);
f(list); //0.05186688311688284
```
<a name="pm.rasch"></a>
### pm.rasch(a, b) ⇒ <code>number</code>
Rasch probability or Bradley-Terry-Luce probability

**Kind**: static method of <code>[pm](#pm)</code>  
**Returns**: <code>number</code> - - The Rasch probability  
**See**: https://en.wikipedia.org/wiki/Rasch_model  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | param A |
| b | <code>number</code> | param B |

**Example**  
```js
pm.rasch(.3, .7); //0.401312339887548
```
<a name="pm.fisher"></a>
### pm.fisher(aF, bF, [digits]) ⇒ <code>number</code>
Fisher information

**Kind**: static method of <code>[pm](#pm)</code>  
**Returns**: <code>number</code> - - The fisher information  
**See**: https://en.wikipedia.org/wiki/Fisher_information  

| Param | Type | Description |
| --- | --- | --- |
| aF | <code>number</code> | param A |
| bF | <code>number</code> | param B |
| [digits] | <code>number</code> | number of digits to appear after the decimal point |

**Example**  
```js
pm.fisher(.3, .7); //0.24026074574152914
```


[npm-url]: https://npmjs.org/package/d-pac.functions
[npm-image]: https://badge.fury.io/js/d-pac.functions.svg
[travis-url]: https://travis-ci.org/d-pac/d-pac.functions
[travis-image]: https://travis-ci.org/d-pac/d-pac.functions.svg?branch=master
[daviddm-url]: https://david-dm.org/d-pac/d-pac.functions.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/d-pac/d-pac.functions