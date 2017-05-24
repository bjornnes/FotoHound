var chai = require('chai');
var expect = chai.expect;

var socketTest = require('../service/clientSocket');

describe('norwegianWord', function(){
  it('norwegianWord() should return empty array', function(done){
      socketTest.norwegianWord([],[],function(res){
        expect(res).to.have.lengthOf(0);
        done();
      });

  });
});
describe('#Testing clientSocket', function() {
    it('englishWord() should return 20 words', function(done) {
      try{
          socketTest.englishWord(['soccer'],[], function(res) {
          expect(res).to.have.lengthOf(20);
            done();
          });
          }catch(err){
            done(err);
          }
      });
    });
