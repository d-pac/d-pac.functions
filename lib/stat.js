'use strict';

const _ = require( 'lodash' );

const returnValue = ( value ) => value;

/**
 * Squares a number
 * @example
 * stat.square(10); //100
 * @function
 * @memberof stat
 * @param {Number} value
 * @returns {Number}
 */
const square = _.partialRight( Math.pow, 2 );

/**
 * Addition of a sequence of numbers - ∑
 * @see https://en.wikipedia.org/wiki/Summation
 * @example
 * stat.sum([1, 2, 3, 5, 8 ]); //19
 * @example
 * stat.sum([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //19
 * @function
 * @memberof stat
 * @param {Array} list - set of numbers
 * @param {Function} [f] - (optional) function used to retrieve the value
 * @returns {Number}
 */
const sum = _.partialRight( ( list,
                              f ) =>{
  return _.reduce( list, ( memo,
                           item ) => memo + f( item ), 0 );
}, _, returnValue );

/**
 * Arithmetic mean, sum of a sequence of numbers divided by sequence length
 * @see https://en.wikipedia.org/wiki/Mean
 * @example
 * stat.mean([1, 2, 3, 5, 8 ]); //3.8
 * @example
 * stat.mean([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //3.8
 * @function
 * @memberof stat
 * @param {Array} list - set of numbers
 * @param {Function} [f] - (optional) function used to retrieve the value
 * @returns {Number}
 */
const mean = _.partialRight( ( list,
                               f ) =>{
  return sum( list, f ) / _.get( list, 'length', NaN );
}, _, returnValue );

/**
 * The distance between numbers in a set
 * @see https://en.wikipedia.org/wiki/Variance
 * @example
 * stat.variance([1, 2, 3, 5, 8 ]); //6.16
 * @example
 * stat.variance([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //6.16
 * @function
 * @memberof stat
 * @param {Array} list - set of numbers
 * @param {Function} [f] - (optional) function used to retrieve the value
 * @returns {Number}
 */
const variance = _.partialRight( ( list,
                                   f ) =>{
  const meanValue = mean( list, f );
  return mean( list, ( item ) => square( f( item ) - meanValue ) );
}, _, returnValue );

/**
 * Standard deviation - σ
 * @see https://en.wikipedia.org/wiki/Standard_deviation
 * @example
 * stat.sd([1, 2, 3, 5, 8 ]); //2.4819347291981715
 * @example
 * stat.sd([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //2.4819347291981715
 * @function
 * @memberof stat
 * @param {Array} list - set of numbers
 * @param {Function} [f] - (optional) function used to retrieve the value
 * @returns {Number}
 * @alias sd
 */
const standardDeviation = _.partialRight( ( list,
                                            f ) =>{
  return Math.sqrt( variance( list, f ) );
}, _, returnValue );

/**
 * Root mean square, quadratic mean
 * @see https://en.wikipedia.org/wiki/Root_mean_square
 * @example
 * stat.rms([1, 2, 3, 5, 8 ]); //4.538722287164087
 * @example
 * stat.rms([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //4.538722287164087
 * @function
 * @memberof stat
 * @param {Array} list - set of numbers
 * @param {Function} [f] - (optional) function used to retrieve the value
 * @returns {Number}
 */
const rms = _.partialRight( ( list,
                              f ) =>{
  return Math.sqrt( mean( list, ( item ) => square( f( item ) ) ) );
}, _, returnValue );

/**
 * Returns the median of the set
 * @see https://en.wikipedia.org/wiki/Median
 * @example
 * stat.median([2, 5, 19, 3, -100]); // 3
 * @example
 * stat.median([{v:2}, {v:5}, {v:19}, {v:3}, {v:-100}], (item)=> item.v); // 3
 * @function
 * @memberof stat
 * @param {Array} list - set of numbers
 * @param {Function} [f] - (optional) function used to retrieve the value
 * @returns {Number}
 */
const median = _.partialRight( ( list,
                                 f ) =>{
  let subject = _.sortBy( list, f );
  const n = subject.length;
  const n2 = Math.floor( n / 2 );
  const mod = n % 2;

  return (mod)
    ? f( subject[ n2 ] )
    : (f( subject[ n2 - 1 ] ) + f( subject[ n2 ] )) / 2;
}, _, returnValue );

/**
 * @namespace
 */
const stat = {
  square: square,
  sum: sum,
  mean: mean,
  variance: variance,
  sd: standardDeviation,
  standardDeviation: standardDeviation,
  rms: rms,
  median: median
};

module.exports = stat;