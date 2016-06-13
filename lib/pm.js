'use strict';

const stat = require( './stat' );

/**
 * Overall consistency of a measure
 * @example
 * pm.reliability(4, 2); //0.75
 * @function
 * @memberof pm
 * @param {number} sd - Standard deviation
 * @param {number} rmse - RMS of the SE
 * @returns {number}
 */
const reliability = ( sd, rmse ) => {
  const gsq = stat.square( sd / rmse );
  return (gsq - 1) / gsq;
};

/**
 * Creates a function by taking two getters, which can be used to calculate the reliability of a set of values and SE's
 * @example 
 * const list = [{v:1, se:4}, {v:2, se:2}, {v:3, se:0}, {v:5, se:0.45}, {v:8, se:3}];
 * const f = pm.reliabilityFunctor((item)=>item.v, (item)=>item.se);
 * f(list); //0.05186688311688284
 * @function
 * @memberof pm
 * @param {Function} getAbility - getter for ability
 * @param {Function} getSE - getter for standard error
 * @returns {Function}
 */
const reliabilityFunctor = ( getAbility, getSE ) =>{
  return ( list ) => reliability( stat.sd( list, getAbility ), stat.rms( list, getSE ) );
};

/**
 * Rasch probability or Bradley-Terry-Luce probability
 * @example
 * pm.raschProb(.3, .7); //0.401312339887548
 * @function
 * @memberof pm
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const rasch = ( a, b ) =>{
  const expDiff = Math.exp( a - b );
  return expDiff / (1 + expDiff);
};

/**
 * Fisher information
 * @param {number} aF
 * @param {number} bF
 * @returns {number}
 */
const fisher = ( aF, bF ) => { 
  var r = rasch( aF, bF );
  return r * (1 - r);
  //return Number( fischInf.toFixed( 3 ) );
};

/**
 * @namespace
 */
const pm = {
  reliability: reliability,
  reliabilityFunctor: reliabilityFunctor
};

module.exports = pm;

