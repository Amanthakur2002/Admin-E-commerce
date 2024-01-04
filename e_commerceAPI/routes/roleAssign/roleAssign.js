const express = require('express');
const roleAssignRouter = express.Router();
const { assignRole, getRolesById, revokeRole, getAllRoles }=require("../../controller/roleAssign/roleAssign");

roleAssignRouter.post("/assignRoleToUser",assignRole);
roleAssignRouter.post("/getAssignedRolesById",getRolesById);
roleAssignRouter.post("/getallroles", getAllRoles);
roleAssignRouter.post("/revokeRole",revokeRole);

module.exports=roleAssignRouter