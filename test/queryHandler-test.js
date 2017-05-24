var chai = require('chai');
var expect = chai.expect;

var queryHandler = require('../handlers/queryHandler');

describe('queryHandler', function(){
  it('findRelatedWords should return array of length 20', function(done){
   try{
      queryHandler.findRelatedWords(['soccer'],[],'eng',function(res){
        expect(res).to.have.lengthOf(13); //Soccer in english returns 13 words after applying listLogic
        done();
      });
   }catch(err){
     console.log('error');
      done(err);
    }
  });

  it('listLogic() should return empty array if inputs are empty',function(){
    queryHandler.listLogic([],function(res){
      expect(res).to.have.lengthOf(0);
      done();
    });
  });
  it('mapper() should return empty array if input is empty',function(){
    queryHandler.mapper([],function(res){
      expect(res).to.have.lengthOf(0);
      done();
    });
  });
});
