const router = require("express").Router();
const multer = require("multer");
const upload = multer();

const {addUser,getallUser, getUserById, updateUser, deleteUser, loginUser, getMe}=require('../controllers/userController');
const authGuard = require("../helpers/authGuard");
const isAdmin = require("../helpers/isAdmin");

router.post("/register",upload.none(),addUser);
router.get("/getallUser",authGuard,isAdmin,getallUser);
router.get("/getme",authGuard,isAdmin,getMe);
router.get("/getUser/:id",authGuard,isAdmin,getUserById);
router.put("/updateUserById/:uid",authGuard,isAdmin,updateUser);
router.delete("/deleteUser/:uid",authGuard,isAdmin,deleteUser);
router.post("/loginUser",loginUser);

module.exports=router;