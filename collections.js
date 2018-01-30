var express = require('express')
var app = express()
var MongoClient =require('mongodb').MongoClient;
//var url ='mongodb://UATAll:UATAll@10.9.50.43:10055/CollectionsDB?authSource=admin';
//var url1 ='mongodb://UATAll:UATAll@10.9.50.43:10055/CommonDB?authSource=admin';
var url ='mongodb://ProdRead:ProdRead%40123@10.9.52.51:10050/CollectionsDB?authSource=admin';
//var url1 ='mongodb://ProdRead:ProdRead%40123@10.9.52.51:10050/CommonDB?authSource=admin';
//var str="";
app.route('/mainpage').get(function(req,res){
	
	str="<html>"+"<style>"
	+".button {  background-color: black;    border: 2px solid grey;   color: white;    padding: 15px 32px;    text-align: center;    text-decoration: none;display: inline-block;    font-size: 16px; }"
	+".button1 {  background-color: black;   border: 2px solid grey;   color: white;    padding: 15px 32px;    text-align: center;    text-decoration: none;display: inline-block;    font-size: 16px; }"
	+".button2 {  background-color: black;   border: 2px solid grey;   color: white;    padding: 15px 32px;    text-align: center;    text-decoration: none;display: inline-block;    font-size: 16px; }"
	+".button3 {  background-color: black;   border: 2px solid grey;   color: white;    padding: 15px 32px;    text-align: center;    text-decoration: none;display: inline-block;    font-size: 16px; }"
	+"</style>"
	+"<body align=center background='http://www.juniorconsulting.be/img/bg_about.jpg' style='background-size:100%;background-repeat: no-repeat;font-size:28px;color: black;font-family:calibri;' >"
	+"<div id='example1'>"
	+"<br>"
	+"<br>"
	+"<br>"
	+"<br>"
	+"<br>"
	+"<b>Leap Collection DATA</b>"
	+"<br>"
	+"<br>"
	+"<a href='/VF' class='button'><b>Receipt VF</b></a>"
	+"<a href='/HEHL' class='button1'><b>Receipt HEHL</b></a>"
	+"<a href='/GI' class='button2'><b>Genex Interface</b></a>"
	+"<a href='/SR' class='button2'><b>SR Interface</b></a>"
	+"<br>"
	+"<br>"
	+"</div>"
	str=str+"</table>"+"</body>"+"</html>";
	res.send(str);
});


app.route('/VF').get(function(req,res){
var str="";
MongoClient.connect(url,function(err,db){
console.log("Receipt VF");
str= "";
str=str+"<html>"+"<body align=center background='http://www.juniorconsulting.be/img/bg_about.jpg'  style='background-size:100%;background-repeat: no-repeat;font-size:28px;font-color:blue font-family:courier;''>"+"<table border =2 align=center style='border-color: Black;font-size:32px;background-color: grey;color: black'>"
+"<style>"
+".button {  background-color: black;  border: 2px solid white;   color: white;    padding: 10px 32px;    text-align: center;    text-decoration: none;    display:inline-block;    font-size: 15px; }"
	+".button1 {  background-color: black;   border: 2px solid white;   color: white;    padding: 10px 32px;    text-align: center;    text-decoration: none; display: inline-block;    font-size: 15px; }"
	+"</style>"
	+"<br>"
	+"<br>"
	+"<br>"
	+"<a href='/mainpage' class='button' align:'center'>Home</a>"
	+"<a href='/HEHL' class='button1'>Receipt HEHL</a>"
	+"<br>"
	+"<b>VF Receipt Count For August 17</b>"
	+"<br>"
	+"<br>"
str +="<th>"+"Receipt Type"+"</th>"+"<th>"+"Count"+"</th>";
var c = db.collection('Receipt');

/* c.findOne({}, function(err, item) {
      console.log(item)
      db.close();
    });
  */
  
  c.aggregate([{$match:{"receiptEnteredTime": {$gt: new Date("2017-07-31T18:30:00.000+0000")},"isCancelled": false,"productType": "VF" 
	}},{$group:{_id:"$receiptType",total:{$sum:1}}}],function(e,r){
	console.log("Res"+JSON.stringify(r));
	var totalValue = 0;
r.forEach(function(doc,i){
	//console.log(doc._id);
	
 if(doc._id == 'OD'){
	 totalValue =  totalValue + doc.total
 str=str+"<tr>"+"<td>"+"OD"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>"
  }
   if(doc._id == 'EMD'){
	   totalValue =  totalValue + doc.total
  str=str+"<tr>"+"<td>"+"EMD"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>";
  }
   if(doc._id == 'FORECLOSURE'){
	   totalValue =  totalValue + doc.total
	   str=str+"<tr>"+"<td>"+"Foreclosure"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>";
  }
  if(doc._id == 'SHORTFALL'){
	  totalValue =  totalValue + doc.total
	  str=str+"<tr>"+"<td>"+"Shortfall"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>";
  }
   if(doc._id == 'SALE'){
	   totalValue =  totalValue + doc.total
	   str=str+"<tr>"+"<td>"+"Sale"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>";

  }
   if(doc._id == 'INS'){
	   totalValue =  totalValue + doc.total
	   str=str+"<tr>"+"<td>"+"INS"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>";
  }
   if(doc._id == 'NonAgreement'){
	   totalValue =  totalValue + doc.total
	   str=str+"<tr>"+"<td>"+"NonAgreement"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>";
  }
   if(doc._id == 'IMD'){
	   totalValue =  totalValue + doc.total
	   str=str+"<tr>"+"<td>"+"IMD"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>";
  }
 
  if(i == (r.length-1)) {
		str=str+"<tr>"+"<td>"+"Total"+"</td>"+"<td>"+totalValue+"</td>"+"</tr>";
	res.send(str);
  }
  
	});
	
});
	  db.close();
	});

	
	
	});
	
	var str=str+"</table>"+"</body>"+"</html>";
	


app.route('/HEHL').get(function(req,res){
var str="";
MongoClient.connect(url,function(err,db){
console.log("Receipt HEHL");
str= "";
str=str+"<html>"+"<body align=center background='http://www.juniorconsulting.be/img/bg_about.jpg'  style='background-size:100%;background-repeat: no-repeat;font-size:28px;font-color:blue font-family:courier;''>"+"<table border =2 align=center style='border-color: black;font-size:32px;background-color: grey;color: black'>"
+"<style>"
	+".button {  background-color: black; /* Green */  border: 2px solid white;   color: white;    padding: 10px 32px;    text-align: center;    text-decoration: none;display: inline-block;    font-size: 15px; }"
	+".button1 {  background-color: black; /* Green */  border: 2px solid white;   color: white;    padding: 10px 32px;    text-align: center;    text-decoration: none;display: inline-block;    font-size: 15px; }"
	+"</style>"
	+"<br>"
	+"<br>"
	+"<br>"
	+"<br>"
	+"<a href='/mainpage' class='button' align:'center'>Home</a>"
	+"<a href='/VF' class='button1'>Receipt VF</a>"
	+"<br>"
	+"<br>"
	+"<b>HEHL Receipt Count For August 17</b>"
	+"<br>"
	+"<br>"
str +="<th>"+"Receipt Type"+"</th>"+"<th>"+"Count"+"</th>";
var c = db.collection('Receipt');
  c.aggregate([{$match:{"receiptEnteredTime":{$gt: new Date("2017-07-31T18:30:00.000+0000")},"isCancelled": false,"productType": { $in: ["HL","HE"] }
  }},{$group:{_id:"$receiptType",total:{$sum:1}}}],function(e,r){
	//console.log(JSON.stringify(r));
	var totalValue=0;
	r.forEach(function(doc,i){
 if(doc._id == 'IMD'){
 totalValue =  totalValue + doc.total
 str=str+"<tr>"+"<td>"+"IMD"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>"
  }
   if(doc._id == 'OD'){
   totalValue =  totalValue + doc.total
  str=str+"<tr>"+"<td>"+"OD"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>";
  }
   if(doc._id == 'NonAgreement'){
   totalValue =  totalValue + doc.total
	   str=str+"<tr>"+"<td>"+"NonAgreement"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>";
  }
  if(doc._id == 'FORECLOSURE'){
  totalValue =  totalValue + doc.total
	  str=str+"<tr>"+"<td>"+"Foreclosure"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>";
  }
   if(doc._id == 'PART PAYMENT'){
   totalValue =  totalValue + doc.total
	   str=str+"<tr>"+"<td>"+"Part Payment"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>";
}
   if(doc._id == 'ADVANCE EMI'){
   totalValue =  totalValue + doc.total
	   str=str+"<tr>"+"<td>"+"ADVANCE EMI"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>";
  }
  if(i == (r.length-1)) {
		str=str+"<tr>"+"<td>"+"Total"+"</td>"+"<td>"+totalValue+"</td>"+"</tr>";
	
	    console.log(r);
		res.send(r);
  }
  
	})
	
});
	  db.close();
	});

	
	
	});
	
	var str=str+"</table>"+"</body>"+"</html>";
	
	/*app.route('/GI').get(function(req,res){
var str="";
MongoClient.connect(url,function(err,db){
console.log("Genex Queue");
str= "";
str=str+"<html>"+"<body align=center background='http://www.juniorconsulting.be/img/bg_about.jpg'  style='background-size:100%;background-repeat: no-repeat;font-size:28px;font-color:blue font-family:courier;''>"+"<table border =2 align=center style='border-color: black;font-size:32px;background-color: grey;color: black'>"
+"<style>"
	+".button {  background-color: black; border: 2px solid white;   color: white;    padding: 10px 32px;    text-align: center;    text-decoration: none;display: inline-block;    font-size: 15px; }"
	+".button1 {  background-color: black;   border: 2px solid white;   color: white;    padding: 10px 32px;    text-align: center;    text-decoration: none;display: inline-block;    font-size: 15px; }"
	+"</style>"
	+"<br>"
	+"<br>"
	+"<br>"
	+"<br>"
	//+"<a href='/mainpage' class='button' align:'center'>Home</a>"
	//+"<a href='/VF' class='button1'>Receipt VF</a>"
	+"<br>"
	+"<br>"
	+"<b>Genex Interface Status</b>"
	+"<br>"
	+"<br>"
str +="<th>"+"Image Status"+"</th>"+"<th>"+"Count"+"</th>";
var c = db.collection('GenexQueue');
  c.aggregate([{$match:{"metaData.Module":{ $regex: /COLLECTIONS/, $options: 'i' },
  "createdDate":{ $gt: new Date("2016-06-10T18:20:00.000+0000"),$lt: new Date("2016-06-30T18:20:00.000+0000") }}},
  {$group:{_id:"$status",total:{$sum:1}}}],function(e,r){
	console.log(JSON.stringify(r));
	var totalValue=0;
	r.forEach(function(doc,i){
 if(doc._id == 'CREATED'){
 totalValue =  totalValue + doc.total
 str=str+"<tr>"+"<td>"+"CREATED"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>"
  }
   if(doc._id == 'PROCESSED'){
   totalValue =  totalValue + doc.total
  str=str+"<tr>"+"<td>"+"PROCESSED"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>";
  }
   if(doc._id == 'FAILED'){
   totalValue =  totalValue + doc.total
	   str=str+"<tr>"+"<td>"+"<a href='/GenexError'>FAILED</a>"+"</td>"+"<td>"+doc.total+"</td>"+"</tr>"
  }
  
  if(i == (r.length-1)) {
		str=str+"<tr>"+"<td>"+"Total"+"</td>"+"<td>"+totalValue+"</td>"+"</tr>";
	res.send(str);
  }
  
	})
	
});
	  db.close();
	});

	
	
	});
	
	var str=str+"</table>"+"</body>"+"</html>";*/
	
/*app.route('/GenexError').get(function(req,res){
	var str="";
MongoClient.connect(url,function(err,db){
	
str="<html>"+"<body  align=center  style='font-size:28px;background-color: white;font-color: blue font-family:courier;'>"
+"<table border =1 style='border-color: black;font-size:19px;background-color: #66cccc;font-color: blue'>"+"<tr bgColor=#ffffff>"
+"<th>"+"S.no"+"</th>"
+"<th>"+"RequestID"+"</th>"
+"<th>"+"ModifiedDate"+"</th>"
+"<th>"+"Status"+"</th>"
+"<th>"+"LeadID"+"</th>"
+"<th>"+"Error Message"+"</th>"
+"</tr>"
+"<style>"
+".button {  background-color: #4CAF50;  border: black;   color: white;    padding: 10px 32px;    text-align: center;    text-decoration: none;    display: inline-block;    font-size: 15px; }"
	+".button1 {  background-color: BLUE;border: none;   color: white;    padding: 10px 32px;    text-align: center;    text-decoration: none;    display: inline-block;    font-size: 15px; }"
	+"</style>"
	+"<a href='/mainpage' class='button' align:'center'>Home</a>"
	+"<a href='/VF' class='button1'>VF_STATUS</a>"
	+"<br>"
	+"<br>"

var b = db.collection('InterfaceQueue');
m=0;
b.find({"requestType": "LOAN_MOVEMENT","productGroup":{$in:["AUTO"]},"status":{$in:["Error"]},"modifiedDate":{$gte: new Date ("2017-05-04T00:00:00.000+0530")}}).sort({requestID:-1}).toArray(function(e,r){  
 
// r.sort({requestID:1}).forEach(function(doc,i){
 r.forEach(function(doc,iq){
	// console.log(typeof r)
	// console.log(iq)
	 //console.log(doc)
	 
 m=m+1;
 c1=m;
 if(doc!= null){
 if(doc.requestDetail){
 for(var j=0;j<doc.requestDetail.length;j++){
for(var l=0;l<doc.requestDetail[j].request.custDetails.length;l++){
    for(var k=0;k<doc.requestDetail[j].request.loanDetails.length;k++){
      for(var i=0;i<doc.responseDetail.length;i++){
 var y =doc.responseDetail[doc.responseDetail.length-1];
 if(doc.responseDetail[i] = y){
var d = new Date(doc.modifiedDate);
var n = d.toDateString();
 
      str=str+"<tr bgColor=#9999ff>"
	  +"<td>"+c1+"</td>"
	  +"<td>"+doc.requestID+"</td>"
	  +"<td>"+doc.modifiedDate+"</td>"
	  +"<td>"+doc.status+"</td>"
	  +"<td>"+doc.requestDetail[j].request.loanDetails[k].leadID+"</td>"
	  +"<td>"+doc.responseDetail[i].errorMessage+"</td>"
	  +"</tr>";
	  
	 break;}break;}
    
	
	
	break;}break;}break;}
	
	}
		
	}
	
	if(iq == (r.length-1)){
		 res.send(str);

	
		
	}

  
 });
 
 });
	db.close();
	});
	 //res.send(str);
	
});


var str=str+"</table>"+"</body>"+"</html>";	

	*/
app.route('/GI').get(function(req,res){
	
	str="<html>"
	+"<body align=center background='http://www.zwamstam-apeldoorn.nl/wp-content/uploads/2017/03/Under-Construction-1920-700.png' style='background-size:100%;background-repeat: no-repeat;font-size:28px;color: black;font-family:calibri;' >"
	str=str+"</body>"+"</html>";
	res.send(str);
});
	
app.route('/SR').get(function(req,res){
	
	str="<html>"
	+"<body align=center background='http://www.zwamstam-apeldoorn.nl/wp-content/uploads/2017/03/Under-Construction-1920-700.png' style='background-size:100%;background-repeat: no-repeat;font-size:28px;color: black;font-family:calibri;' >"
	str=str+"</body>"+"</html>";
	res.send(str);
});

var server = app.listen(3434,function()
	{
	console.log('Example app listening on port 3434!');
	}
	);
