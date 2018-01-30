var CashHandler ={
    list : require('./handlers/CAB.js').list
} 
var ChequeHandler ={
    list : require('./handlers/CHB.js').list 
}
var DraftHandler ={
    list : require('./handlers/DDB.js').list
}
var BranchHandler ={
    list : require('./handlers/BRAN.js').list
}

 var BranchHandler = require('./handlers/BRAN.js');

module.exports = function(app) {

	//api routes
    //app.get('/api/CashBank', CashHandler.CashBank);
    //app.get('/api/chequeBank', ChequeHandler.chequeBank);
    //app.get('/api/DraftBank', DraftHandler.DraftBank);
    //app.get('/api/Branch', BranchHandler.Branch);
    
    app.get('/api/CashBank', function(req,res){
        res.send([CashHandler.CashBank])
    });
    app.get('/api/chequeBank', function(req,res){
        res.send([ChequeHandler.ChequeBank])
    });
    app.get('/api/DraftBank', function(req,res){
        res.send([DraftHandler.DraftBank])
    });
 
//     app.get('/api/Branch', function(req,res){
//        res.send([BranchHandler.Branch])
//    });

    app.get('/api/Branch',BranchHandler.Branch);
    // app.get('/api/CashBank', CashHandler.CashBank);
    // app.get('/api/ChequeBank', ChequeHandler.chequeBank);
    // app.get('/api/DraftBank', DraftHandler.DraftBank);



    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

};
