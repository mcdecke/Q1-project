const chai = require('chai');
const expect = chai.expect;
const main = require('../js/states/GameState.js');

// var SpaceShooter = SpaceShooter || {};

// console.log(localStorage.getItem('High Score'));

describe('SpaceShooter', function () {
  it('is an object', function () {
    expect(SpaceShooter).to.be.an('object')
  })
  it('bools will be bools', function(){
    expect(true).to.eql(true)
  })
  it('bools 2: electric boolgaloo', function(){
    expect(false).to.eql(false)
  })
  it('expects localStorage to exist...', function(){
    expect(localStorage.getItem('High Score')).to.be.less.than(100)
  })
})
