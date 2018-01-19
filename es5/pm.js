'use strict';

var stat = require('./stat');

/**
 * Overall consistency of a measure
 * @example
 * pm.reliability(4, 2); //0.75
 * @function
 * @memberof pm
 * @param {number} sd - Standard deviation
 * @param {number} rmse - RMS of the SE
 * @returns {number} - The reliability
 */
var reliability = function reliability(sd, rmse) {
  var gsq = stat.square(sd / rmse);
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
 * @returns {Function} - Function to be used on a list to calculate the reliability
 */
var reliabilityFunctor = function reliabilityFunctor(getAbility, getSE) {
  return function (list) {
    return reliability(stat.sd(list, getAbility), stat.rms(list, getSE));
  };
};

/**
 * Rasch probability or Bradley-Terry-Luce probability
 * @see https://en.wikipedia.org/wiki/Rasch_model
 * @example
 * pm.rasch(.3, .7); //0.401312339887548
 * @function
 * @memberof pm
 * @param {number} a - param A
 * @param {number} b - param B
 * @returns {number} - The Rasch probability
 */
var rasch = function rasch(a, b) {
  var expDiff = Math.exp(a - b);
  return expDiff / (1 + expDiff);
};

/**
 * Fisher information
 * @see https://en.wikipedia.org/wiki/Fisher_information
 * @example
 * pm.fisher(.3, .7); //0.24026074574152914
 * @example
 * pm.fisher(.3, .7, 4); //0.2403
 * @function
 * @memberof pm
 * @param {number} aF - param A
 * @param {number} bF - param B
 * @param {number} [digits] - number of digits to appear after the decimal point
 * @returns {number} - The fisher information
 */
var fisher = function fisher(aF, bF, digits) {
  var r = rasch(aF, bF);
  var info = r * (1 - r);
  if (digits) {
    return Number(info.toFixed(digits));
  }
  return info;
};

/**
 * @namespace
 */
var pm = {
  reliability: reliability,
  reliabilityFunctor: reliabilityFunctor,
  rasch: rasch,
  fisher: fisher
};

module.exports = pm;
