var mongoose = require('mongoose');

// define our user model

module.exports = mongoose.model('Bank', {
bankID : { type :'string',default:''},
bankDesc : {type : 'String', default: ''},
status :{type : 'string', default:''},
bankCashFlag :{type:'string',default:''}
});
