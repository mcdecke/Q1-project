const chai = require('chai');
const expect = chai.expect;
// const main = require('../js/main.js');
const main = require('../js/states/GameState.js');

var SpaceShooter = SpaceShooter || {};
// console.log(SpaceShooter);

describe('SpaceShooter', function () {
  it('is not undefined', function () {
    expect(SpaceShooter).to.not.be.undefined
  })
  it('expects localStorage to exist.', function(){

    expect('localStorage[0]').to.not.be.undefined
  })
  it('expects currentLevel to be greater than zero.', function(){
    let currentLevel = 1;
    expect(currentLevel).to.be.above(0)
  })
  it('bools will be bools', function(){
    expect(true).to.eql(true)
  })
  it('bools 2: electric boolgaloo', function(){
    expect(false).to.deep.eql(false)
  })
})
