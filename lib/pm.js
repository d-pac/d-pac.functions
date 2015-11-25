'use strict';

var stat = require( './stat' );

/**
 * Overall consistency of a measure
 * @param {number} sd - Standard deviation
 * @param {number} rmse - RMS of the SE
 * @returns {number}
 */
var reliability = function( sd,
                            rmse ){
  var gsq = stat.square( sd / rmse );
  return (gsq - 1) / gsq;
};

/**
 * 
 * @param {Function} getAbility - getter for ability
 * @param {Function} getSE - getter for standard error
 * @returns {Function}
 * @usage
 var getAbility = _.partialRight( _.get, 'ability.value' );
 var getSE = _.partialRight( _.get, 'ability.se' );
 var representationReliability = reliabilityFunctor(getAbility, getSE);
 console.log(representationReliability(representations));
 */
var reliabilityFunctor = function( getAbility,
                                   getSE ){
  return function( list ){
    return reliability( stat.sd( list, getAbility ), stat.rms( list, getSE ) );
  }
};

module.exports = {
  reliability: reliability,
  reliabilityFunctor: reliabilityFunctor
};

