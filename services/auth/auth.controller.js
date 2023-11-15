const express = require('express');
const user = require('./auth.service');
const router = express.Router(); 
router.post('/signup',user.addUser);
router.post('/login',user.user_login);
router.get('/getUserData', user.getUser); 
router.put("/updateUserDetails",user.updateUser);
router.post("/addAgent",user.addAgent);
router.get('/getAgent', user.getAgent); 
router.get('/getAllUserData', user.getAllUser); 
router.get('/getAllUsers', user.getAllUsers); 
router.get('/searchUser', user.SearchUser); 
module.exports = router