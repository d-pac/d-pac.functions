'use strict';

/* global describe, it, beforeEach */
/* jshint unused:false */

const _ = require('lodash');
//const sinon = require( 'sinon' );
//const stub = require( 'proxyquire' );
const expect = require('must');
const fx = require('./fixtures');
const stat = require('../stat');

const accessor = (item) => item.value;

function createFixtures(objectMap) {
  return {
    objectMap: objectMap,
    objectArray: _.values(objectMap),
    numberArray: _.values(objectMap).map(accessor),
    numberMap: _.reduce(objectMap, (memo, item, key) => {
      memo[key] = accessor(item);
      return memo;
    })
  };
}

describe('stat', () => {

  describe('spec file', () => it('should be found', () => expect(true).to.be.true()));

  describe('.square()', () => {
    it('should square correctly', () => {
      expect(stat.square(0)).to.equal(0);
      expect(stat.square(4)).to.equal(16);
      expect(stat.square(-3)).to.equal(9);
      expect(stat.square(2.5)).to.equal(6.25);
    });
  });

  describe('.sum()', () => {
    const items = createFixtures(fx.sum.items);
    it('should return 0 for an empty list or undefined', () => {
      expect(stat.sum([])).to.equal(0);
      expect(stat.sum()).to.equal(0);
    });
    it('should function correctly with an array of numbers', () => {
      expect(stat.sum(items.numberArray)).to.equal(fx.sum.expected);
    });
    it('should function correctly with an array of objects', () => {
      expect(stat.sum(items.objectArray, accessor)).to.equal(fx.sum.expected);
    });

  });
  describe('.mean()', () => {
    const items = createFixtures(fx.mean.items);
    it('should return 0 for an empty list or undefined', () => {
      expect(stat.mean([])).to.be.nan();
      expect(stat.mean()).to.be.nan();
    });
    it('should function correctly with arrays of numbers', () => {
      expect(stat.mean(items.numberArray))
          .to.equal(fx.mean.expected);
    });
    it('should function correctly with arrays of objects', () => {
      expect(stat.mean(items.objectArray, accessor))
          .to.equal(fx.mean.expected);
    });
  });
  describe('.variance()', () => {
    const items = createFixtures(fx.variance.items);
    it('should return NaN for an empty list or undefined', () => {
      expect(stat.variance([])).to.be.nan();
      expect(stat.variance()).to.be.nan();
    });
    it('should function correctly with arrays of numbers', () => {
      expect(stat.variance(items.numberArray)).to.equal(fx.variance.expected);
    });
    it('should function correctly with arrays of objects', () => {
      expect(stat.variance(items.objectArray, accessor)).to.equal(fx.variance.expected);
    });

  });
  describe('.sd()', () => {
    const items = createFixtures(fx.sd.items);
    it('should return NaN for an empty list or undefined', () => {
      expect(stat.sd([])).to.be.nan();
      expect(stat.sd()).to.be.nan();
    });
    it('should function correctly with arrays of numbers', () => {
      expect(stat.sd(items.numberArray))
          .to.equal(fx.sd.expected);
    });
    it('should function correctly with arrays of objects', () => {
      expect(stat.sd(items.objectArray, accessor))
          .to.equal(fx.sd.expected);
    });
  });
  describe('.rms()', () => {
    const items = createFixtures(fx.rms.items);
    it('should return NaN for an empty list or undefined', () => {
      expect(stat.rms([])).to.be.nan();
      expect(stat.rms()).to.be.nan();
    });
    it('should function correctly with arrays of numbers', () => {
      expect(stat.rms(items.numberArray))
          .to.equal(fx.rms.expected);
    });
    it('should function correctly with arrays of objects', () => {
      expect(stat.rms(items.objectArray, accessor))
          .to.equal(fx.rms.expected);
    });
  });
  describe('.median()', () => {
    const items = {
      even: createFixtures(fx.median.even.items),
      odd: createFixtures(fx.median.odd.items)
    };

    it('should return NaN for an empty list or undefined', () => {
      expect(stat.median([])).to.be.nan();
      expect(stat.median()).to.be.nan();
    });
    it('should function correctly with odd sized arrays of numbers', () => {
      expect(stat.median(items.odd.numberArray))
          .to.equal(fx.median.odd.expected);
    });
    it('should function correctly with odd sized arrays of objects', () => {
      expect(stat.median(items.odd.objectArray, accessor))
          .to.equal(fx.median.odd.expected);
    });
    it('should function correctly with even sized arrays of numbers', () => {
      expect(stat.median(items.even.numberArray))
          .to.equal(fx.median.even.expected);
    });
    it('should function correctly with even sized arrays of objects', () => {
      expect(stat.median(items.even.objectArray, accessor))
          .to.equal(fx.median.even.expected);
    });
  });
  describe('.standardize()', () => {
    const items = createFixtures(fx.standardize.items);
    it('should function correctly with arrays of numbers', () => {
      expect(stat.standardize(items.numberArray))
          .to.eql(fx.standardize.expected);
    });
    it('should function correctly with arrays of objects', () => {
      expect(stat.standardize(items.objectArray, accessor))
          .to.eql(fx.standardize.expected);
    });
  });
});
