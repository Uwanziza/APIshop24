# APIFORSHOP24
 APIs that hotels will use to manage their requests of buying from Shop24 and transport to their clients.
INSTRUCTION FOR THIS PROJECT
*I USED NODEJS AND POSTMAN FOR THIS PROJECT

I CREATED TABLE MUNUALLY  IN MYSQL XAMPP 

THIS ARE FORMAT OF MY tables
TABLE FOR DRINKS 
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
      " PRIMARY KEY (receipt_id) )";
  con.query(sql2, function(err, results) {
          if (err) throw err;
          console.log("Table  created");
      });*/
      
      2* Second use postman to test the APIS
      3* The folder APIDOCUMENT IT CONTAINS PICS THAT SHOWS POSTMAN RESULT OF TEST AND DOCUMENTATION APIS
      4* LAST BUT NOT LIST SERVERJS  CONTAINS ALL APIS .
