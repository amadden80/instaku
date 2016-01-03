var faker = require('faker');
var syllable = require('syllable');

function genLine(syllableCount){
  var phrase = faker.hacker.phrase();
  while( syllable(phrase) >= syllableCount ){
    phrase = phrase.split(' ');
    phrase.pop();
    phrase = phrase.join(' ');
  };
  return phrase;
}

function genKu(){
  return [genLine(5), genLine(7), genLine(5)].join('\n');
}

module.exports.genLine = genLine;
module.exports.genKu = genKu;
