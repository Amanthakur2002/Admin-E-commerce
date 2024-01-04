const connection = require("../../model/dbconnect");

const addRole = async(req,res) =>{

    let userData = [req.body.roleid,req.body.rolename]
    console.log(userData);
    
   
     let sqlQuery =`insert into role values(?,?)`;


     await connection.query(sqlQuery,userData,function(error,result) {
        if(error){
            console.log("error", error.sqlMessage);
        }

        else{
            res.json(result);
        }
    }
     )
}

// ======================== ===================
const updateRole = async(req,res) =>{
    
   let data=[ req.body.rolename, req.body.roleid ]

 let sqlQuery = `update role set rolename=? where roleid=?`;

 await connection.query(sqlQuery,data,function(error,result){
    if(error){
        console.log("error", error.sqlMessage);
    }
    else{
        res.json(result);
    }
})
}

//get roles ============================================
const getRoles = async(req,res) =>{

    // let userData = req.body;
    // console.log(userData);
     let sqlQuery ="select * from role";



     await connection.query(sqlQuery,[],function(error,result) {
        if(error){
            console.log("error", error.sqlMessage);
        }

        else{
            res.json(result);
        }
    }
     )
}




module.exports={addRole,updateRole,getRoles}