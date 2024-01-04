const connection = require("../../model/dbconnect");

// POST==============================================
const assignRole = async(req,res) =>{
    let id = req.body.id
    let rolenamee = req.body.roleid
    let userData = [id, rolenamee]
    console.log("ud",userData);
    console.log(rolenamee);
    console.log(id);
       
    let sqlQuery =`insert into role_assign(id, roleid) values(?, (select roleid from role where rolename = ?));`;

     await connection.query(sqlQuery,userData,function(error,result){
        if(error){
            console.log("error", error.sqlMessage);
        }

        else{
            res.json(result);
        }
    }
     ) 
}

//POST(get) ===========================================================
const getRolesById = async(req,res) =>{

    let userData = req.body.id;
    
    let sqlQuery = "SELECT r.rolename FROM role_assign AS ra JOIN role AS r ON ra.roleid = r.roleid WHERE ra.id = ? ;"

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
//POST(get) ===========================================================
const getAllRoles = async(req,res) =>{

    let userData = req.query.id;
    
    let sqlQuery ="select rolename from role;";

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

// delete(ROLE)===============================================
const revokeRole = async(req,res) =>{
    let id = req.body.id
    let rolename = req.body.rolename
    let userData = [ id, rolename]
    console.log("first",userData)
    
    let sqlQuery =` delete from role_assign where id = ? and roleid = (select roleid from role where rolename = ?); `

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

module.exports = { assignRole,getAllRoles,getRolesById,revokeRole}