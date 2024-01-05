const connection = require("../../model/dbconnect");



/////////////////POST DATA///////////////////

const addsubcategory = async(req,res,)=>{
    let data = req.body;
    let sqlquery=`INSERT INTO sub_category set?`;
   
    await connection.query(sqlquery,[data],function(error,result){
      if(error){
        console.log(error)
        //res.status(200).json({error:error})
      }
      else{
        console.log(result)
        res.send("sub_category successfully added")
      }
    })
  }
  
  const addSubCat = (req, res) => {
// data query se bhejna zaruri hai body se nahi jaa rha hai 
    const subqueryid = req.query.sub_categoryid
    console.log("subqueryid", subqueryid)

    // const subname = req.body.sub_categoryname
    // const subid = req.body.category_id
    // const subbid = req.body.sub_categoryid
    // console.log("subqname", subname)
    // console.log("subqname", subid)
    // console.log("subqname", subbid)

    const sub_categoryimg = req.file.location
    console.log("first", sub_categoryimg)

    const data = [req.query.sub_categoryid, req.query.sub_categoryname,sub_categoryimg,req.query.category_id]

console.log("data", data)

    let sql_query = `INSERT into sub_category(sub_categoryid,sub_categoryname,sub_categoryimg, category_id) values(?,?,?,?)`
        connection.query(sql_query,data,(err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
    };

  /////////////////////GET DATA////////////////
  
  const subcategorylist = async(req,res)=>{
    let sqlquery='SELECT * from sub_category'
    await connection.query(sqlquery,function(error,result){   
         
      if(error){
        console.log(error)        
      }
      else{
        // console.log(result)
        res.send(result)
        console.log(result)
      }
    })
  }
  
  ////////////////////////UPDATE DATA with PUT////////////
  
  const updatesubcategory = async(req,res)=>{
    let id = req.query.subcategory_id;
    // let data2 = req.body;

    const data = [req.query.sub_categoryid, req.query.sub_categoryname, sub_categoryimg, req.query.category_id]

    let sqlquery=`UPDATE sub_category SET ? WHERE subcategory_id=?`;
    await connection.query(sqlquery,[data],function(error,result){
      if(error){
        console.log(error)
      }
      else{
        console.log(result)
        res.send("changes successfully applied!!")
      }
    })
  }
  
  module.exports = {subcategorylist,updatesubcategory,addsubcategory,addSubCat};
  
  