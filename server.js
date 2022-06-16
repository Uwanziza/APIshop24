const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
var mysql = require('mysql');
const app = express();
const port = 3005;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:'node'
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("MySql db Connected!");
  });
 //point 1 ,To get  all lists of drinks
 app.get('/fetch-Alldrinks', function (req,res,next){
    var sql=`SELECT * FROM drinks`;
    con.query(sql,function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
    
  });
  //Point 2,get all list of most consumed product drink and quantity
  app.get('/fetch-consumed/:product', function (req,res,next){
      var{product}=req.params;
    var sql=`SELECT * FROM drinks where product =? `;
    con.query(sql,[product],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
    
  });
  
  /*Point 3 ,Get a list of all available drinks and nearest cargo
company to the client within 3km based on the client’s
location*/
app.get('/fetch-available_drinks/:cargo_id/:distance/', function (req,res,next){
    var{cargo_id,distance}=req.params;
  var sql=`SELECT * FROM drinks where cargo_id=? AND distance=? `;
  con.query(sql,[cargo_id,distance],function (err,data){
      if(err) {
          console.log(err)
          return;
        };
        if (data.length > 0) {
          res.send({status:200, message:'success',data});    
        } else {    
          res.send({status:404, message:'failed'});
        }
      });
  
});
//point 4 , fetch drink by Id
app.get('/fetch-drink/:drink_id', function (req,res,next){
    var{drink_id}=req.params;
  var sql=`SELECT * FROM drinks where drink_id=?  `;
  con.query(sql,[drink_id],function (err,data){
      if(err) {
          console.log(err)
          return;
        };
        if (data.length > 0) {
          res.send({status:200, message:'success',data});    
        } else {    
          res.send({status:404, message:'failed'});
        }
      });
});
//For part2 order 
//Create a new ‘order’ request by assigning a list of drinks to a specific client
app.post('/insert-order', (req, res) => {
    let {product}=req.body;
    product=product.toString();//refers to different drinks
    let object=({...req.body,product});
     con.query("insert into orders set ?",[(object)],(error,data)=>{
      if(error){
       console.log(error);
         res.status(404).send({message:'error'})
         return;
       }
       res.status(200).send({message:'success'})
     
     });
    
    })
     //POINT 2 ,Choose top five orders that were requested by different clients
     app.get('/fetch-TOP5/', function (req,res,next){
    var sql=`SELECT * FROM orders limit 5`;
    con.query(sql,function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
  });  
//Get top 10 paid orders, their client details, and transporter details
app.get('/fetch-tenOrders', function (req,res,next){
var sql=`SELECT * FROM orders ORDER BY order_id ASC LIMIT 10`;
con.query(sql,function (err,data){
    if(err) {
        console.log(err)
        return;
      };
      if (data.length > 0) {
        res.send({status:200, message:'success',data});    
      } else {    
        res.send({status:404, message:'failed'});
      }
    });
});

//COMPLETE AN ORDER
app.post('/complete-order', (req, res) => {
  let object=req.body;
   con.query("insert into orders set ?",[(object)],(error,data)=>{
    if(error){
     console.log(error);
       res.status(404).send({message:'error'})
       return;
     }

     res.status(200).send({message:'success'})
   
   });
  
  })
  //Part 3 clients
  //To fetch all clients
  app.get('/fetch-Allclients', function (req,res,next){
    var sql=`SELECT * FROM client`;
    con.query(sql,function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
    
  });

  //Point 2, fetch client by client ID
  app.get('/fetch-client/:client_id', function (req,res,next){
    var{client_id}=req.params
    var sql=`SELECT * FROM client where client_id=?`;
    con.query(sql,[client_id],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
    
  });

  //point 3,For a specific retailer client/hotel, get a list of the 3 closest cargo companies
  app.get('/fetch-Speficclient/', function (req,res,next){
    var sql=`SELECT * FROM client  ORDER BY cargo_id ASC LIMIT 3`;
    con.query(sql,function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
    
  });

  //Part 4,fetch all cargo 
  app.get('/fetch-Allcargo', function (req,res,next){
    var sql=`SELECT * FROM cargo`;
    con.query(sql,function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
  });

//Point 2,fetch cargoCompany by cargo_id
app.get('/fetch-cargo/:cargo_id', function (req,res,next){
  var{cargo_id}=req.params
  var sql=`SELECT * FROM cargo where cargo_id=?`;
  con.query(sql,[cargo_id],function (err,data){
      if(err) {
          console.log(err)
          return;
        };
        if (data.length > 0) {
          res.send({status:200, message:'success',data});    
        } else {    
          res.send({status:404, message:'failed'});
        }
      });
  
});

//For a specific cargo company, get a list of drinks transported by date range
app.get('/fetch-dateRange/', function (req,res,next){
  var sql=`SELECT * FROM cargo where Date_range  BETWEEN '2022-06-01' AND '2022-06-15' ;`;
  con.query(sql,function (err,data){
      if(err) {
          console.log(err)
          return;
        };
        if (data.length > 0) {
          res.send({status:200, message:'success',data});    
        } else {    
          res.send({status:404, message:'failed'});
        }
      }); 
});
/*create a new model for ‘Receipts’ and
generate a receipt after each order is completed*/
app.get('/fetch-receipt/:order_id', function (req,res,next){
  var{order_id}=req.params
  var sql=`SELECT * FROM receipt where order_id=?`;
  con.query(sql,[order_id],function (err,data){
      if(err) {
          console.log(err)
          return;
        };
        if (data.length > 0) {
          res.send({status:200, message:'success',data});    
        } else {    
          res.send({status:404, message:'failed'});
        }
      });
  
});

app.listen(port,function(){
    console.log("Listening to port " +port); 
    });

//THESE ARE MYSQL TABLE I USED DATA MODEL
    /*var sql2="CREATE TABLE drinks"+
  "(drink_id INT not null AUTO_INCREMENT,"+
    " product VARCHAR (255),"+
    " quantity VARCHAR (255),"+
     "cargo_id integer (5),"+
     "client_id integer (5),"+
     "distance varchar (10),"+
      " PRIMARY KEY (drink_id) )";
  con.query(sql2, function(err, results) {
          if (err) throw err;
          console.log("Table  created");
      });*/

/*var sql2="CREATE TABLE ORDERs"+
  "(order_id INT not null AUTO_INCREMENT,"+
    "product VARCHAR (255),"+
     "cargo_id integer (5),"+
     "client_id integer (5),"+
     "client_username varchar(60),"+
     "status integer (5),"+
      " PRIMARY KEY (order_id) )";
  con.query(sql2, function(err, results) {
          if (err) throw err;
          console.log("Table  created");
      });*/
 /*var sql2="CREATE TABLE client"+
  "(client_id INT not null AUTO_INCREMENT,"+
    "username VARCHAR (255),"+
     "cargo_id integer (5),"+
      " PRIMARY KEY (client_id) )";
  con.query(sql2, function(err, results) {
          if (err) throw err;
          console.log("Table  created");
      });*/

/* var sql2="CREATE TABLE cargo"+
  "(cargo_id INT not null AUTO_INCREMENT,"+
    "companyName VARCHAR (255),"+
     "drink_id integer (5),"+
      "Date_range Date,"+
      " PRIMARY KEY (cargo_id) )";
  con.query(sql2, function(err, results) {
          if (err) throw err;
          console.log("Table  created");
      });*/

/*var sql2="CREATE TABLE Receipt"+
  "(receipt_id INT not null AUTO_INCREMENT,"+
    " product VARCHAR (255),"+
    "quantity VARCHAR (255),"+
     "order_id integer (5),"+
     "client_id integer (5),"+
      "Amount integer (20),"+
      " PRIMARY KEY (receipt_id) )";

  con.query(sql2, function(err, results) {
          if (err) throw err;
          console.log("Table  created");
      });*/