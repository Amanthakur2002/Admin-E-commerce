const connection = require("../../model/dbconnect");



// PATCH (change user profile photo)========================================================
const profilePhotoChange = async(req,res) =>{
    
    let data=[ req.body.profilephoto, req.query.id
     ]
 
 
  let sqlQuery = `update userprofile set profilephoto=? where id=?`;
 
 
 
  await connection.query(sqlQuery,data,function(error,result){
     if(error){
         console.log("error", error.sqlMessage);
     }
 
     else{
         res.json(result);
     }
 })
 }

 // PATCH (change user profile photo)========================================================
 const updateProfile = async(req,res) =>{
    
    let data=[ req.body.mobile,
        req.body.email, 
        req.query.id
     ]
 
 
  let sqlQuery = `update userprofile set mobile=?,email=? where id=?`;
 
 
 
  await connection.query(sqlQuery,data,function(error,result){
     if(error){
         console.log("error", error.sqlMessage);
     }
 
     else{
         res.json(result);
     }
 })
 }




module.exports={profilePhotoChange,updateProfile}