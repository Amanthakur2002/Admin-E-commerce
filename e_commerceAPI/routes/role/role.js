const express = require('express');
const roleRouter = express.Router();
const{addRole,updateRole,getRoles}=require("../../controller/role/role");


roleRouter.post("/addrole",addRole);
roleRouter.put("/updateRole",updateRole);
roleRouter.post("/getRoles",getRoles);



module.exports=roleRouter