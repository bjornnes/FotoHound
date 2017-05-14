var chai = require('chai');
var expect = chai.expect;

var resultRanker = require('../handlers/resultRanker');

describe('resultRanker', function(){
  it('rank() should return empty array if passing empty inputs', function(){
      resultRanker.rank([],[],function(res){
        var answer = [];
        expect(res).to.have.lengthOf(0);
      });
  });

  it('rank () should return empty array if inputs are unfinished',function(){
    resultRanker.rank(['','car','train'],['','unfinished'],function(res){
      console.log(res);
      expect(res).to.equal([]);
      done();
    });
  });

  it('rank () should return different array if inputs are correct',function(){
    resultRanker.rank([],[],function(res){
      console.log(res);
      expect(res).to.equal([]);
      done();
    });
  });
});
