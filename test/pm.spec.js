'use strict';

/* global describe, it, beforeEach */
/* jshint unused:false */

const _ = require( 'lodash' );
//const sinon = require( 'sinon' );
//const stub = require( 'proxyquire' );
const expect = require( 'must' );
const fx = require( './fixtures' );
const pm = require( '../pm' );

const accessor = ( item ) => item.value;

describe( 'pm', () =>{

  describe( 'spec file', () => it( 'should be found', () => expect( true ).to.be.true() ) );

  describe( '.reliability()', ()=>{
    it( 'should return -Infinity when SD equals 0', ()=>{
      expect( pm.reliability( 0, 1 ) ).to.equal( -Infinity );
    } );
    it( 'should return NaN when RMSE equals 0', ()=>{
      expect( pm.reliability( 1, 0 ) ).to.be.nan();
    } );
    it( 'should function correctly', ()=>{
      expect( pm.reliability( 4, 2 ) ).to.equal( 0.75 );
    } );
  } );
  describe( '.reliabilityFunctor()', ()=>{
    it( 'should function correctly', ()=>{
      const f = pm.reliabilityFunctor( accessor, ( item )=>item.se );
      expect( f( fx.reliabilityFunctor.accessor.list ) ).to.equal( fx.reliabilityFunctor.accessor.expected );
    } );
  } );
  describe( '.rasch()', ()=>{
    it( 'should function correctly', ()=>{
      _.each( fx.rasch, ( fixture,
                          i )=>{
        const actual = pm.rasch( fixture.a, fixture.b );
        expect( actual, `fixture with {a: ${fixture.a}, b: ${fixture.b}} resulting in` ).to.equal( fixture.expected );
      } );
    } );
  } );
  describe( '.fisher()', ()=>{
    it( 'should function correctly for unfixed requests', ()=>{
      _.each( fx.fisher.unfixed, ( fixture,
                                   i )=>{
        const actual = pm.fisher( fixture.a, fixture.b );
        expect( actual, `fixture with {a: ${fixture.a}, b: ${fixture.b}} resulting in` ).to.equal( fixture.expected );
      } );
    } );
    it( 'should return a number for fixed requests', ()=>{
      const fixture = fx.fisher.fixed;
      const actual = pm.fisher( fixture.a, fixture.b, fixture.digits );
      expect( actual ).to.be.a.number();
    } );
    it( 'function correctly for fixed requests', ()=>{
      const fixture = fx.fisher.fixed;
      const actual = pm.fisher( fixture.a, fixture.b, fixture.digits );
      expect( actual ).to.equal( fixture.expected );
    } );
  } );

} );
