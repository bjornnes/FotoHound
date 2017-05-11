var chai = require('chai');
var expect = chai.expect;

var socketTest = require('../socketTest');

// describe('#sqrt()', function() {
//         it('should return the square root of a given positive number', function() {
//             expect(Math.sqrt(25)).to.be.equal(5);
//         });
//
//         it('should return NaN for a given negative number', function() {
//             expect(Math.sqrt(-9)).to.be.NaN;
//         });
//
//         it('should return 0 given 0', function() {
//             expect(Math.sqrt(0)).to.be.equal(0);
//         });
//     });

describe('norwegianWord', function(){
  it('norwegianWord() should return empty array', function(){
      socketTest.norwegianWord('',function(res){
        console.log(res);
        expect(res).to.equal('hellohello');
        done();
      });

  });

  it('norwegianWord() should return array with 20 ML results', function(){
    try{
      var ml_array = [[ 'gaelic', 0.7185006141662598 ],
        [ 'league»', 0.7181911468505859 ],
        [ 'mls', 0.7098103761672974 ],
        [ 'professional', 0.7032642960548401 ],
        [ 'amateur', 0.6976091265678406 ],
        [ 'tournament', 0.6923490166664124 ],
        [ 'leaguelaget', 0.6903707981109619 ],
        [ 'womens', 0.6901589632034302 ],
        [ 'premiership', 0.6887438297271729 ],
        [ 'ahl', 0.6877849102020264 ],
        [ 'pccer', 0.7186381220817566 ],
        [ 'footballer', 0.6525722742080688 ],
        [ '«football', 0.6474525928497314 ],
        [ 'football', 0.6447027921676636 ],
        [ 'league nfl', 0.6346848607063293 ],
        [ 'wleague', 0.6236479878425598 ],
        [ 'nationwide', 0.6187139749526978 ],
        [ 'footballers', 0.6186310052871704 ],
        [ 'fotballligaen', 0.616796612739563 ],
        [ 'football»', 0.6095315217971802 ]];
      socketTest.norwegianWord('soccer',function(res){
        expect(res).to.equal('tullball');
        done();
      });
    } catch(err){
      done(err);
    }

  });
});

describe('englishWord', function(){
  it('englishWord() should return empty array', function(){
    try{
      var array = [];
      socketTest.englishWord('',function(res){
        expect(res).to.equal('  ');
        done();
      });
    } catch(err){
      done(err);
    }
  });
});
