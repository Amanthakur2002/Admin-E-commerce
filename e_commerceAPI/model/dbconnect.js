let mysql = require('mysql')

let details={
    user:'root',
    password:'',
    host:'localhost',
    database:'ecom'
}

let connection=mysql.createConnection(details)

connection.connect(function(error){
    if(error){
        console.log(error.sqlMessage)
    }
    else{
        console.log("Database connected")
    }
})

module.exports=connection;