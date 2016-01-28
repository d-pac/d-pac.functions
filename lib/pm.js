'use strict';

const stat = require( './stat' );

/**
 * Overall consistency of a measure
 * @param {number} sd - Standard deviation
 * @param {number} rmse - RMS of the SE
 * @returns {number}
 */
const reliability = ( sd, rmse ) => {
  const gsq = stat.square( sd / rmse );
  return (gsq - 1) / gsq;
};

/**
 * 
 * @param {Function} getAbility - getter for ability
 * @param {Function} getSE - getter for standard error
 * @returns {Function}
 * @usage
 const getAbility = _.partialRight( _.get, 'ability.value' );
 const getSE = _.partialRight( _.get, 'ability.se' );
 const representationReliability = reliabilityFunctor(getAbility, getSE);
 console.log(representationReliability(representations));
 */
const reliabilityFunctor = ( getAbility, getSE ) =>{
  return ( list ) => reliability( stat.sd( list, getAbility ), stat.rms( list, getSE ) );
};

module.exports = {
  reliability: reliability,
  reliabilityFunctor: reliabilityFunctor
};

