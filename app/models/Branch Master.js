var mongoose = require('mongoose');

// define our user model

// var Schema = mongoose.Schema;
// var BranchSchema = new Schema({ 
// branchID : {type : 'string', default:''},	 
// branchDesc : {type : 'String', default: ''},
// bankDetails :{type : 'Array', default:''},
// status :{type : 'string', default:''}
// });

//  module.exports = mongoose.model('Branch',BranchSchema,'Branch');

//  module.exports = mongoose.model('Branch', {
// branchID : {type : 'string'},	 
// branchDesc : {type : 'String'},
// bankDetails :{type : 'Array'},
// status :{type : 'string'}
// });

// var Schema = mongoose.Schema;
// var BranchSchema = new Schema({
//     branchID: String,
//     branchDesc: String,
//     bankDetails: Array,
//     status: String
// });

// var Branch = mongoose.model('Branch', BranchSchema);

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    branchID : String,
    branchDesc : String,

});
var User = mongoose.model('User', UserSchema,'Branch');