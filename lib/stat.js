const _ = require( 'lodash' );

const returnValue = (value) => value;
const curry = (t) =>{
  return (list, f) =>{
    return t(list, f || returnValue);     
  }
};

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
 * @example 
 * stat.sum([1, 2, 3, 5, 8 ]); //19
 * @example 
 * stat.sum([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //19
 * @function
 * @memberof stat
 * @param {Array} list
 * @param {Function} [f]
 * @returns {Number}
 */
const sum = curry( ( list, f ) => _.reduce( list, ( memo, item ) => memo + f( item ), 0 ) );

/**
 * Arithmetic mean, sum of a sequence of numbers divided by sequence length
 * @example 
 * stat.mean([1, 2, 3, 5, 8 ]); //3.8
 * @example 
 * stat.mean([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //3.8
 * @function
 * @memberof stat
 * @param {Array} list
 * @param {Function} [f]
 * @returns {Number}
 */
const mean = curry( ( list, f ) => sum( list, f ) / _.get(list, 'length', 0) );

/**
 * The distance between numbers in a set
 * @example 
 * stat.variance([1, 2, 3, 5, 8 ]); //6.16
 * @example 
 * stat.variance([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //6.16
 * @function
 * @memberof stat
 * @param {Array} list
 * @param {Function} [f]
 * @returns {Number}
 */
const variance = curry( ( list, f ) => {
  const meanValue = mean( list, f );
  return mean( list, ( item ) => square( f( item ) - meanValue ) );
} );

/**
 * Standard deviation - σ
 * @example 
 * stat.sd([1, 2, 3, 5, 8 ]); //2.4819347291981715
 * @example 
 * stat.sd([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //2.4819347291981715
 * @function
 * @memberof stat
 * @param {Array} list
 * @param {Function} [f]
 * @returns {Number}
 * @alias sd
 */
const standardDeviation = curry( ( list, f ) => Math.sqrt( variance( list, f ) ) );

/**
 * Root mean square, quadratic mean
 * @example 
 * stat.rms([1, 2, 3, 5, 8 ]); //4.538722287164087
 * @example 
 * stat.rms([{v:1}, {v:2}, {v:3}, {v:5}, {v:8}], (item)=> item.v); //4.538722287164087
 * @function
 * @memberof stat
 * @param {Array} list
 * @param {Function} [f]
 * @returns {Number}
 */
const rms = curry( ( list, f ) => Math.sqrt( mean( list, ( item ) => square( f( item ) ) ) ) );

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
  rms: rms
};

module.exports = stat;