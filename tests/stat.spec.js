'use strict';

/* global describe, it, beforeEach */
/* jshint unused:false */

const _ = require( 'lodash' );
//const sinon = require( 'sinon' );
//const stub = require( 'proxyquire' );
const expect = require( 'must' );
const fx = require( './fixtures' );
const stat = require( '../stat' );

const accessor = ( item ) => item.value;

describe( 'stat', () =>{

  describe( 'spec file', () => it( 'should be found', () => expect( true ).to.be.true() ) );

  describe( '.square()', ()=>{
    it( 'should square correctly', ()=>{
      expect( stat.square( 0 ) ).to.equal( 0 );
      expect( stat.square( 4 ) ).to.equal( 16 );
      expect( stat.square( -3 ) ).to.equal( 9 );
      expect( stat.square( 2.5 ) ).to.equal( 6.25 );
    } );
  } );

  describe( '.sum()', ()=>{
    it( 'should return 0 for an empty list or undefined', ()=>{
      expect( stat.sum( [] ) ).to.equal( 0 );
      expect( stat.sum() ).to.equal( 0 );
    } );
    it( 'should function correctly', ()=>expect( stat.sum( fx.sum.simple.list ) ).to.equal( fx.sum.simple.expected ) );
    it( 'should allow passing an accessor', ()=>expect( stat.sum( fx.sum.accessor.list, accessor ) ).to.equal( fx.sum.accessor.expected ) );
  } );
  describe( '.mean()', ()=>{
    it( 'should return NaN for an empty list or undefined', ()=>{
      expect( stat.mean( [] ) ).to.be.nan();
      expect( stat.mean() ).to.be.nan();
    } );
    it( 'should function correctly', ()=>expect( stat.mean( fx.mean.simple.list ) ).to.equal( fx.mean.simple.expected ) );
    it( 'should allow passing an accessor', ()=>expect( stat.mean( fx.mean.accessor.list, accessor ) ).to.equal( fx.mean.accessor.expected ) );
  } );
  describe( '.variance()', ()=>{
    it( 'should return NaN for an empty list or undefined', ()=>{
      expect( stat.variance( [] ) ).to.be.nan();
      expect( stat.variance() ).to.be.nan();
    } );
    it( 'should function correctly', ()=>expect( stat.variance( fx.variance.simple.list ) ).to.equal( fx.variance.simple.expected ) );
    it( 'should allow passing an accessor', ()=>expect( stat.variance( fx.variance.accessor.list, accessor ) ).to.equal( fx.variance.accessor.expected ) );
  } );
  describe( '.sd()', ()=>{
    it( 'should return NaN for an empty list or undefined', ()=>{
      expect( stat.sd( [] ) ).to.be.nan();
      expect( stat.sd() ).to.be.nan();
    } );
    it( 'should function correctly', ()=>expect( stat.sd( fx.sd.simple.list ) ).to.equal( fx.sd.simple.expected ) );
    it( 'should allow passing an accessor', ()=>expect( stat.sd( fx.sd.accessor.list, accessor ) ).to.equal( fx.sd.accessor.expected ) );
  } );
  describe( '.rms()', ()=>{
    it( 'should return NaN for an empty list or undefined', ()=>{
      expect( stat.rms( [] ) ).to.be.nan();
      expect( stat.rms() ).to.be.nan();
    } );
    it( 'should function correctly', ()=>expect( stat.rms( fx.rms.simple.list ) ).to.equal( fx.rms.simple.expected ) );
    it( 'should allow passing an accessor', ()=>expect( stat.rms( fx.rms.accessor.list, accessor ) ).to.equal( fx.rms.accessor.expected ) );
  } );
  describe( '.median()', ()=>{
    it( 'should return NaN for an empty list or undefined', ()=>{
      expect( stat.median( [] ) ).to.be.nan();
      expect( stat.median() ).to.be.nan();
    } );
    it( 'should function correctly with lists of odd length', () => {
      expect( stat.median( _.shuffle( fx.median[ "simple-odd" ].list ) ) ).to.equal( fx.median[ "simple-odd" ].expected )
    } );
    it( 'should function correctly with lists of even length', () => {
      expect( stat.median( _.shuffle( fx.median[ "simple-even" ].list ) ) ).to.equal( fx.median[ "simple-even" ].expected )
    } );
    it( 'should allow passing an accessor with lists of odd length', () => {
      expect( stat.median( _.shuffle( fx.median[ "accessor-odd" ].list ), accessor ) ).to.equal( fx.median[ "accessor-odd" ].expected )
    } );
    it( 'should allow passing an accessor with lists of even length', () => {
      const data = fx.median[ "accessor-even" ];
      expect( stat.median( _.shuffle( data.list ), accessor ) ).to.equal( data.expected );
    } );
  } );
} );