var chai = require('chai');
var expect = chai.expect;

var imageHandler = require('../handlers/imageHandler');


//Not implemeted Depenceies Injection, and FotoWeb connection returs different results as the image feed updates.
//Tests if exceptions works


describe('imageHandler', function(){
  // it('fotowebSearch() should return empty array if input are empty', function(){
  //     imageHandler.fotowebSearch("",function(res){
  //       expect(res).to.have.lengthOf(0);
  //       done();
  //     });
  // });

  // it('search() should return empty array if input is empty',function(){
  //   imageHandler.search('',true,function(res){
  //     console.log(res);
  //     expect(res).to.have.lengthOf(0);
  //     done();
  //   });
  // });


  it('rank () should return empty array if inputs are empty',function(){
    imageHandler.rank([],[],function(res){
      expect(res).to.have.lengthOf(0);
      done();
    });
  });
});
