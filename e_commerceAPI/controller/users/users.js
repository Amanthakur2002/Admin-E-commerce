const connection = require("../../model/dbconnect");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// POST (Login)
// ================================
// const userLogin = async (req, res) => {
//   let userData = [
//     req.body.id,
//     req.body.password
//   ];
//   console.log(userData);
//   let sqlQuery = ` SELECT u.id, u.name, u.password, GROUP_CONCAT(DISTINCT ra.roleid) AS roleids FROM users u LEFT JOIN role_assign ra ON u.id = ra.id LEFT JOIN role r ON ra.roleid = r.roleid WHERE u.id = ? AND password = ? GROUP BY u.id, u.name, u.password;`;

//   await connection.query(sqlQuery, userData, function (error, result) {
//     if (error) {
//       console.log("error", error.sqlMessage);
//     } else { 
//       res.json(result);
//     }
//   });
// };

// const userLogin = (req, res) => {
//   const id = req.body.id
//   const sql = `SELECT id, name, password, GROUP_CONCAT(roleid) AS roleids FROM users LEFT JOIN role_assign  ON id = id LEFT JOIN role ON roleid = roleid WHERE id = ? AND password = ? GROUP BY.id,name, password;
//   ;`
//   connection.query(sql, [req.body.id],(err , data) => {
//     console.log(id,"id")
//     console.log(data,"data")
//     console.log(req.body.password,"pass")
//       if(err) return res.json({Error : "Login error in server"})
//       console.log(id,"id")
 
//       if(data.length > 0){
//           console.log("data",data)
//           bcrypt.compare(req.body.password.toString(),data[0].password,( err , response) => {
//               if(err) return res.json({"Status":"Password compare error"})
//               console.log("first",response)
//               if(response){
//                   const name = data[0].name
//                   const token = Jwt.sign( {name},'jwt-secret-key' , {expiresIn: '1d'} )
//                   res.cookie('token',token)
//                   // res.cookie('email',id)
//                   console.log(data)
//                   console.log("first")                

//                   return res.json({"Status":"Success"})
//               } else {
//                   return res.json({"Error":"Password not matched"})                    
//               }
//           })
//       } else {
//           return res.json({"Error": "No Email Existed"})
//       }
//   })
// }

const userLogin = async (req, res) => {
  const { id, password } = req.body;
console.log("oprojesdg")
  if (!id || !password) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // const query = 'SELECT id, password FROM users WHERE id = ?';
  const query = 'SELECT u.id, u.name, u.password, GROUP_CONCAT(ra.roleid) AS roleids FROM users u LEFT JOIN role_assign ra ON u.id = ra.id LEFT JOIN role r ON ra.roleid = r.roleid WHERE u.id = ? GROUP BY u.id, u.name, u.password;';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log("first",results)
    const roles = results[0].roleids

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const storedPassword = results[0].password;

    // Compare the provided password with the stored, encrypted password
    bcrypt.compare(password, storedPassword, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        console.error('Password comparison error:', bcryptErr);
        return res.status(500).json({ error: 'Password comparison error' });
      }

      if (!bcryptResult) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      // Create and send a JWT token if authentication is successful
      const token = jwt.sign({ id }, "jwtSecretKey", { expiresIn: '1d' });
                  res.cookie('token',token)
                  res.cookie('id',id)

      res.json({ token, roles });
    });
  });
};

// Login ends
// =================================

//POST (registeration of user)==================================================
const userRegister = async (req, res) => {
  console.log(req.body.password,"pass")
  console.log(req.body.name,"name")
  console.log(req.body.id,"id")
  try {
      const saltRounds = 10; // You can adjust the number of salt rounds

      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(req.body.password, salt);

      const sql = "INSERT INTO users(`id`, `name`, `password`) VALUES(?, ?, ?)";
      const values = [req.body.id, req.body.name, hash];

      const result = await connection.query(sql, values);

      return res.json({ Status: "Success" });
  } catch (err) {
      return res.json({ Error: "Error in server: " + err.message });
  }
}

// GET (list of users)=============================================
const getUserlist = async(req,res) =>{

    let userData = req.body;
    console.log(userData);
    //  let sqlQuery ="select id,name from users";
     let sqlQuery ="select * from users";



     await connection.query(sqlQuery,[userData],function(error,result) {
        if(error){
            console.log("error", error.sqlMessage);
        }

        else{
            res.json(result);
        }
    }
     )
}

//PATCH (update user) =====================================================
// const userNameUpdate = async (req, res) => {
   

//     let data = [
//         req.body.name,
//         req.body.id,
//         req.body.status]


//     let sqlquery = `UPDATE users SET name=? WHERE id=?`;
//     a = await connection.query(sqlquery, data, (error, result) => {
//         console.log(a.sql)
//         if (error)
//             console.log(error.sqlMessage);
//         else
//             res.send(result);
//     })
// }


const userNameUpdate = async(req,res)=>{
    let id = req.query.id;
    let data2 = req.body.name;
    let sqlquery=`UPDATE users SET name=? WHERE ID=?`;
    await connection.query(sqlquery,[data2,id],function(error,result){
      if(error){
        console.log(error)
      }
      else{
        console.log(result)
        res.send("Your name successfully updated !!")
      }
    })
  }

//PUT (update user Status) =====================================================

// const userStatusUpdate = async (req, res) => {
   

//     let data = [
//         req.query.status,
//         req.query.id
//                     ]


//     let sqlquery = `UPDATE users SET status=? WHERE id=?`;
//     a = await connection.query(sqlquery, data, (error, result) => {
//         console.log(a.sql)
//         if (error)
//             console.log(error.sqlMessage);
//         else
//             res.send(result);
//     })
// }

const userStatusUpdate = async(req,res)=>{
    let id = req.query.id;
    let data2 = req.query.status;
    let sqlquery=`UPDATE users SET status=? WHERE ID=?`;
    await connection.query(sqlquery,[data2,id],function(error,result){
      if(error){
        console.log(error)
      }
      else{
        console.log(result)
        res.send("status changed!!")
      }
    })
  }

// ============================================
let filterUser = async (req, res) => {
    const id = req.query.id
    let sqlquery = 'SELECT name,id,status FROM users where id =?';

    await connection.query(sqlquery, id, function (error, result) {
        if (error)
            console.log(error.sqlMessage);
        else
            res.send(result);
    })

}



// ==================================================



module.exports ={userLogin,userRegister,getUserlist,userNameUpdate,userStatusUpdate,filterUser};