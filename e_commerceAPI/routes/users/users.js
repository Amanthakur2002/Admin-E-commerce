const express = require('express');
const EcomRouter = express.Router();
const {userLogin, userRegister, getUserlist,userNameUpdate,userStatusUpdate,filterUser} = require('../../controller/users/users')





EcomRouter.post('/registeruser', userRegister)
EcomRouter.get('/userList', getUserlist)
EcomRouter.patch('/modifyUser', userNameUpdate)
EcomRouter.put('/updateUserStatus', userStatusUpdate)
EcomRouter.get('/filterUser', filterUser)
EcomRouter.post('/userlogin', userLogin)







module.exports = EcomRouter;