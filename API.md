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
Addition of a sequence of numbers (∑)

**Kind**: static method of <code>[stat](#stat)</code>  

| Param | Type |
| --- | --- |
| list | <code>Array</code> | 
| [f] | <code>function</code> | 

<a name="stat.mean"></a>
### stat.mean(list, [f]) ⇒ <code>Number</code>
Arithmetic mean, sum of a sequence of numbers divided by sequence length

**Kind**: static method of <code>[stat](#stat)</code>  

| Param | Type |
| --- | --- |
| list | <code>Array</code> | 
| [f] | <code>function</code> | 

<a name="stat.variance"></a>
### stat.variance(list, [f]) ⇒ <code>Number</code>
The distance between numbers in a set

**Kind**: static method of <code>[stat](#stat)</code>  

| Param | Type |
| --- | --- |
| list | <code>Array</code> | 
| [f] | <code>function</code> | 

<a name="stat.sd"></a>
### stat.sd(list, [f]) ⇒ <code>Number</code>
Standard deviation (σ),

**Kind**: static method of <code>[stat](#stat)</code>  

| Param | Type |
| --- | --- |
| list | <code>Array</code> | 
| [f] | <code>function</code> | 

<a name="stat.rms"></a>
### stat.rms(list, [f]) ⇒ <code>Number</code>
Root mean square, quadratic mean

**Kind**: static method of <code>[stat](#stat)</code>  

| Param | Type |
| --- | --- |
| list | <code>Array</code> | 
| [f] | <code>function</code> | 

