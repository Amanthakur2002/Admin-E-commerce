const connection = require("../../model/dbconnect");

/////////////////POST DATA///////////////////

const addnewcategory = async(req,res,)=>{
    let data = [req.body.category_id,req.body.category_name,req.body.category_image];
    // let sqlquery=`INSERT INTO category set?`;
    let sqlquery=`INSERT INTO category values(?,?,?,?)`;
   
    await connection.query(sqlquery,data,function(error,result){
      if(error){
        console.log(error)
        //res.status(200).json({error:error})
      }
      else{
        console.log(result)
        res.send("category successfully added")
      }
    })
  }
  
  /////////////////////GET DATA////////////////
  
  const categorylist = async(req,res)=>{
    let sqlquery='SELECT * from category'
    await connection.query(sqlquery,function(error,result){
      if(error){
        console.log(error)
        
      }
      else{
        // console.log(result)
        res.send(result)
      }
    })
  }
  
  ////////////////////////UPDATE DATA with PUT////////////
  
  const updatecategory = async(req,res)=>{
    let id = req.query.category_id;
    let data2 = req.body;
    let sqlquery=`UPDATE category SET ? WHERE category_id=?`;
    await connection.query(sqlquery,[data2,id],function(error,result){
      if(error){
        console.log(error)
      }
      else{
        console.log(result)
        res.send("changes successfully applied!!")
      }
    })
  }
  
  module.exports = {addnewcategory,categorylist,updatecategory}