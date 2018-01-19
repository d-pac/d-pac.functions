'use strict';

/**
 * @private
 * @param {Number} value - a value
 * @returns {Number} the same value
 */

var returnValue = function returnValue(value) {
  return value;
};

/**
 * Squares a number
 * @example
 * stat.square(10); //100
 * @function
 * @memberof stat
 * @param {Number} value - a value
 * @returns {Number} the squared value
 */
var square = function square(value) {
  return Math.pow(value, 2);
};

/**
 * Addition of a sequence of numbers - ∑
 * @see https://en.wikipedia.org/wiki/Summation
 * @example
 * stat.sum([1, 2, 3, 5, 8 ]); //19
 * @example
 * stat.sum([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //19
 * @function
 * @memberof stat
 * @param {Array} collection - set of numbers
 * @param {Function} [f] - (optional) function used to retrieve the value
 * @returns {Number} the sum of all values
 */
var sum = function sum() {
  var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : returnValue;

  return collection.reduce(function (memo, item) {
    return memo + f(item);
  }, 0);
};

/**
 * Arithmetic mean, sum of a sequence of numbers divided by sequence length
 * @see https://en.wikipedia.org/wiki/Mean
 * @example
 * stat.mean([1, 2, 3, 5, 8 ]); //3.8
 * @example
 * stat.mean([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //3.8
 * @function
 * @memberof stat
 * @param {Array} collection - set of numbers
 * @param {Function} [f] - (optional) function used to retrieve the value
 * @returns {Number} the arithmetic mean
 */
var mean = function mean() {
  var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : returnValue;
  return sum(collection, f) / collection.length;
};

/**
 * The distance between numbers in a set
 * @see https://en.wikipedia.org/wiki/Variance
 * @example
 * stat.variance([1, 2, 3, 5, 8 ]); //6.16
 * @example
 * stat.variance([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //6.16
 * @function
 * @memberof stat
 * @param {Array} collection - set of numbers
 * @param {Function} [f] - (optional) function used to retrieve the value
 * @returns {Number} the distance between numbers in a set
 */
var variance = function variance() {
  var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : returnValue;

  var meanValue = mean(collection, f);
  return mean(collection, function (item) {
    return square(f(item) - meanValue);
  });
};

/**
 * Standard deviation - σ
 * @see https://en.wikipedia.org/wiki/Standard_deviation
 * @example
 * stat.sd([1, 2, 3, 5, 8 ]); //2.4819347291981715
 * @example
 * stat.sd([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //2.4819347291981715
 * @function
 * @memberof stat
 * @param {Array} collection - set of numbers
 * @param {Function} [f] - (optional) function used to retrieve the value
 * @returns {Number} the standard deviation
 * @alias sd
 */
var standardDeviation = function standardDeviation() {
  var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : returnValue;
  return Math.sqrt(variance(collection, f));
};

/**
 * Root mean square, quadratic mean
 * @see https://en.wikipedia.org/wiki/Root_mean_square
 * @example
 * stat.rms([1, 2, 3, 5, 8 ]); //4.538722287164087
 * @example
 * stat.rms([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //4.538722287164087
 * @function
 * @memberof stat
 * @param {Array} collection - set of numbers
 * @param {Function} [f] - (optional) function used to retrieve the value
 * @returns {Number} the root mean square
 */
var rms = function rms() {
  var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : returnValue;
  return Math.sqrt(mean(collection, function (item) {
    return square(f(item));
  }));
};

/**
 * Returns the median of the set
 * @see https://en.wikipedia.org/wiki/Median
 * @example
 * stat.median([2, 5, 19, 3, -100]); //3
 * @example
 * stat.median([{v:2}, {v:5}, {v:19}, {v:3}, {v:-100}], (item)=> item.v); // 3
 * @function
 * @memberof stat
 * @param {Array} collection - set of numbers
 * @param {Function} [f] - (optional) function used to retrieve the value
 * @returns {Number} the median
 */
var median = function median() {
  var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : returnValue;

  var subject = collection.sort(function (a, b) {
    return f(a) - f(b);
  }); // always returns an array, regardless of collection type
  var n = subject.length;
  var n2 = Math.floor(n / 2);
  var mod = n % 2;

  return mod ? f(subject[n2]) : (f(subject[n2 - 1]) + f(subject[n2])) / 2;
};

/**
 * calculate standard scores of z scores: z= (x - mu)/sigma
 * @see https://en.wikipedia.org/wiki/Standard_score
 * @example
 * stat.standardize([ 2, 5, 19, -5, 3, -100, -27, -2 ]);
 * // [ 0.4326093777237974,  0.5184161964458729,  0.918848017148892,  0.23239346737228786,  0.4612116506311559, -2.4848224588267702, -0.39685653658959924,  0.31820028609436335 ]
 * @example
 * stat.standardize([{v:2}, {v:5}, {v:19}, {v:3}, {v:-100}, {v:-27}, {v:-2}], (item)=> item.v);
 * // [ 0.4326093777237974,  0.5184161964458729,  0.918848017148892,  0.23239346737228786,  0.4612116506311559, -2.4848224588267702, -0.39685653658959924,  0.31820028609436335 ]
 * @function
 * @memberof stat
 * @param {Array} collection - set of numbers
 * @param {Function} [getter] - (optional) function used to retrieve the value
 * @param {Function} [setter] - (optional) function used to set the standardized value. Obviously could have side-effects when used.
 * @returns {Number[]} an array of standardized z scores
 */
var standardize = function standardize() {
  var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var getter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : returnValue;
  var setter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var meanValue = mean(collection, getter);
  var sdValue = standardDeviation(collection, getter);

  return collection.map(function (item) {
    var v = (getter(item) - meanValue) / sdValue;
    if (setter) {
      setter(item, v);
    }
    return v;
  });
};

/**
 * @namespace
 */
var stat = {
  square: square,
  sum: sum,
  mean: mean,
  variance: variance,
  sd: standardDeviation,
  standardDeviation: standardDeviation,
  rms: rms,
  median: median,
  standardize: standardize
};

module.exports = stat;
