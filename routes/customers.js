
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM info',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
            console.log(rows);
     
           /* res.render('customers',{page_title:"Customers - Node.js",data:rows});*/
            res.send(rows);
           
         });
         
         //console.log(query.sql);
    });

};

/*exports.add = function(req, res){
  res.render('add_customer',{page_title:"Add Customers - Node.js"});
};*/

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM info WHERE rollnumber = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );

            res.send(rows);
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the customer*/
exports.add = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            rollnumber    : input.rollnumber,
            firstname : input. firstname,
            lastname   : input.lastname,
            city   : input.city,
            college   : input.college

        };
        
        var query = connection.query("INSERT INTO info set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/students');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

/*exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone

        };

        connection.query("UPDATE info set ? WHERE id = ? ",[data,id], function(err, rows)
        {

          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/customers');

        });

    });
};*/


exports.delete_customer = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM info  WHERE rollnumber = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/students');
             
        });
        
     });
};


