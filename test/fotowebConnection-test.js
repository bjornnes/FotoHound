var reqp = require('request-promise');
var chai = require('chai');
var assert = require('assert')
var expect = chai.expect;
var fotoweb = require('../service/fotowebConnection');

describe('Fotoweb Connection:', function() {
  it('images found in fotoweb', function() {
    var options = {
        uri: 'http://158.38.43.70/fotoweb/archives/5000-reuters/?q=soccer',//,
        json: true // Automatically parses the JSON string in the response
    };
    return reqp(options).then(function(res) {
      assert(res.assetCount > 1);
    })
  });
});

describe('imageHandler', function(){
  it('fotowebSearch() should return empty array if inputs are empty', function(){
      fotoweb.fotowebConn("",false,0,function(res){
        expect(res).to.have.lengthOf(0);
        done();
      });
  });
});
