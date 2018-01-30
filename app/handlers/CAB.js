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
var Use = mongoose.model('Use', UserSchema,'Bank');

function CashBank (req,res){
  Use.find({"status":"A","bankCashFlag": "C"},null,{limit:100},function (error, data) {
      
   if(error) {
             console.log('Error while retrieving Branch Data' + error);
             
        } else {
             console.log('Branches are retrieved successfully');
            res.json(data);
        }


    });
}
exports.CashBank = CashBank;

// function CashBank (req,res){
//      var CashBank=model.find({ "status": "A", "bankCashFlag": "C" }, {_id: 0}, function (error, data) {
//         if(error) {
//              console.log('Error while retrieving master Data' + error);
//              data.json('Error while retrieving master Data' + error);
//         } else {
//              console.log('Users are retrieved successfully');
//              console.log(data)
//              res.json(data);
//         }
//      })
//       }

// exports.CashBank = CashBank;