const _ = require( 'lodash' );

const returnValue = (value) => value;
const curry = (t) =>{
  return (list, f) =>{
    return t(list, f || returnValue);     
  }
};

/**
 * Squares a number
 * @param {Number} value
 * @returns {Number}
 */
const square = _.partialRight( Math.pow, 2 );

/**
 * Addition of a sequence of numbers (∑)
 * @param {[]} list
 * @param {Function} [f]
 * @returns {Number}
 */
const sum = curry( ( list, f ) => _.reduce( list, ( memo, item ) => memo + f( item ), 0 ) );

/**
 * Arithmetic mean, sum of a sequence of numbers divided by sequence length
 * @param {[]} list
 * @param {Function} [f]
 * @returns {Number}
 */
const mean = curry( ( list, f ) => sum( list, f ) / _.get(list, 'length', 0) );

/**
 * The distance between numbers in a set
 * @param {[]} list
 * @param {Function} [f]
 * @returns {Number}
 */
const variance = curry( ( list, f ) => {
  const meanValue = mean( list, f );
  return mean( list, ( item ) => square( f( item ) - meanValue ) );
} );

/**
 * Standard deviation (σ),
 * @param {[]} list
 * @param {Function} [f]
 * @returns {Number}
 * @alias sd
 */
const standardDeviation = curry( ( list, f ) => Math.sqrt( variance( list, f ) ) );

/**
 * Root mean square, quadratic mean
 * @param {[]} list
 * @param {Function} [f]
 * @returns {Number}
 */
const rms = curry( ( list, f ) => Math.sqrt( mean( list, ( item ) => square( f( item ) ) ) ) );

module.exports = {
  square: square,
  sum: sum,
  mean: mean,
  variance: variance,
  sd: standardDeviation,
  standardDeviation: standardDeviation,
  rms: rms
};