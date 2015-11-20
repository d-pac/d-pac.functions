'use strict';

var stat = require( './stat' );

/**
 *
 * @param {number} sd
 * @param {number} rmse
 * @returns {number}
 */
var reliability = function( sd,
                            rmse ){
  var gsq = stat.square( sd / rmse );
  return (gsq - 1) / gsq;
};

/**
 * 
 * @param {Function} getAbility
 * @param {Function} getSE
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

