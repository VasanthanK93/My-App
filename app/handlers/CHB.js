//var model = require('../models/Bank Master');

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
    bankID : String,
    bankDesc : String
});

// Mongoose Model definition
var Us = mongoose.model('Us', UserSchema,'Bank');

function ChequeBank (req,res){
  Us.find({"status":"A","bankCashFlag": "B"},null,{limit:100},function (error, data) {
      
   if(error) {
             console.log('Error while retrieving Branch Data' + error);
             
        } else {
             console.log('Branches are retrieved successfully');
            res.json(data);
        }


    });
}
exports.ChequeBank = ChequeBank;



// function chequeBank (req,res){
// var chequeBank=model.find({ "status": "A", "bankCashFlag": "B" }, {_id: 0}, function (error, data) {
//         if(error) {
//              console.log('Error while retrieving master Data' + error);
//              res.json('Error while retrieving master Data' + error);
//         } else {
//              console.log('Users are retrieved successfully');
//              res.json(data);
//         }
//      })
// }
// exports.chequeBank = chequeBank;