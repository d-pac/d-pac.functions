var _ = require( 'lodash' );

/**
 * Squares a number
 * @param {Number} value
 * @returns {Number}
 */
var square = _.partialRight( Math.pow, 2 );

/**
 * Addition of a sequence of numbers (∑)
 * @param {[]} list
 * @param {Function} [f]
 * @returns {Number}
 */
var sum = function( list,
                    f ){
  return _.reduce( list, function( memo,
                                   item ){
    return memo + f( item );
  }, 0 );
};

/**
 * Arithmetic mean, sum of a sequence of numbers divided by sequence length
 * @param {[]} list
 * @param {Function} [f]
 * @returns {Number}
 */
var mean = function( list,
                     f ){
  return sum( list, f ) / list.length;
};

/**
 * The distance between numbers in a set
 * @param {[]} list
 * @param {Function} [f]
 * @returns {Number}
 */
var variance = function( list,
                         f ){
  var meanValue = mean( list, f );
  return mean( list, function( item ){
    return square( f( item ) - meanValue );
  } );
};

/**
 * Standard deviation (σ), 
 * @param {[]} list
 * @param {Function} [f]
 * @returns {Number}
 */
var standardDeviation = function( list,
                                  f ){
  return Math.sqrt( variance( list, f ) );
};

/**
 * Root mean square, quadratic mean
 * @param {[]} list
 * @param {Function} [f]
 * @returns {Number}
 */
var rms = function( list,
                    f ){
  return Math.sqrt( mean( list, function( item ){
    return square( f( item ) )
  } ) );
};

module.exports = {
  square: square,
  sum: sum,
  mean: mean,
  variance: variance,
  sd: standardDeviation,
  rms: rms
};