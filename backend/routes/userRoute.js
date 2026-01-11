const router = require("express").Router();
const multer = require("multer");
const upload = multer();

const {addUser,getallUser, getUserById, updateUser, deleteUser, loginUser}=require('../controllers/userController')

router.post("/register",upload.none(),addUser);
router.get("/getallUser",getallUser);
router.get("/getUser/:id",getUserById);
router.put("/updateUserById/:uid",updateUser);
router.delete("/deleteUser/:uid",deleteUser);
router.post("/loginUser",loginUser);

module.exports=router;