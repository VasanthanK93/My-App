//var model = require('../models/Branch Master');

// Mongoose import
var mongoose = require('mongoose');

// Mongoose connection to MongoDB (ted/ted is readonly)
mongoose.connect('mongodb://localhost:27017/MasterDB', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    branchID : String,
    branchDesc : String
});

// Mongoose Model definition
var User = mongoose.model('User', UserSchema,'Branch');


function Branch (req,res){

User.find({"status":"A"},null,{limit:1000},function (error, data) {
      
   if(error) {
             console.log('Error while retrieving Branch Data' + error);
             
        } else {
             console.log('Branches are retrieved successfully');
            res.json(data);
        }


    });
}
exports.Branch = Branch;

// var Branch=Branch.find({"Status":"A"}, {_id: 0},{limit:2}, function (error, data) {
//    console.log(data,"Data By mask")
//         if(error) {
//              console.log('Error while retrieving master Data' + error);
//              res.json('Error while retrieving master Data' + error);
//         } else {
//              console.log('Users are retrieved successfully');
            
//              res.json(data);
//         }
//      })