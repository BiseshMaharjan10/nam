const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")

const getallUser = async (req,res) =>{
    const user = await User.findAll({attributes: {exclude:["password"]}})
    res.json({
        success: true,
        user,
        message: "User Fetched Sucessfully"
    })
}

const getUserById = async (req,res) =>{
    try{
        const id = req.params.id
        const user = await User.findByPk(id)
        if(!user){
            return res.json({
                message: "User not Found"
            })
        }
        return res.json({
            message : "User Fetched Sucessfully",
            user : {
                email : user.email,
                username: user.username
            }
        })
    }catch(error){
        res.status(500).json({
            message : "Error Fetching Data",
            error : error.message
        })
    }
}

const addUser = async (req,res) =>{
    try{
        const { username, email, password } = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                message: "All Fields are Required"
            });
        }

        const userByUsername = await User.findOne({ where: { username } });
        const userByEmail = await User.findOne({ where: { email } });
        if (userByUsername) {
            return res.status(409).json({
                message: "User already registered with these Username."
            });
        }
        if (userByEmail) {
            return res.status(409).json({
                message: "User already registered with these Email."
            });
        }

        const hashed = await bcrypt.hash(password,10)
        const newUser = await User.create({
            username,
            email,
            password: hashed
        });

        res.status(201).json({
            success: true,
            message: "User added Sucessfully",
            user: newUser
        });
    } catch(error){
        res.status(500).json({
            message: "Error adding User",
            error: error.message
        });
    }
}

const updateUser = async (req, res) =>{
    try{

      console.log("Update User Called");
      
        const id = req.params.uid;
        const {username,email,password} = req.body;
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                message : "User not Found"
            })
        }
        if(username){
            const isexistinguser = await User.findOne({where: {username}})
            if(isexistinguser && isexistinguser.id !== user.id){
                return res.status(400).json({
                    message : "user with that username exists!!"
                });
            }
        }
        let hashedPassword = user.password;
        if(password){
            hashedPassword = await bcrypt.hash(password,10);
        }
        await user.update({
            username: username || user.username,
            email: email || user.email,
            password: hashedPassword
        });
        return res.status(200).json({
            success: true,
            message : "User updated Sucessfully",
            user: {
                id: user.id,
                name: user.username,
                email: user.email
            }
        })

    }catch(error){
        return res.status(500).json({
            message: "Error Updating User",
            error: error.message
        })
    }
}


const deleteUser = async (req, res) =>{
    try{
        const id = req.params.uid;
        const user = await User.findByPk(id)
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        await user.destroy();

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"

        })

    }catch(error){
        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        })

    }

}

const loginUser = async(req,res) =>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({where:{email : email}})
        if(!user){
            return res.status(404).json({
                
                message: "User not found"
            })
        }

        const isvalidUser = await bcrypt.compare(password,user.password)
        if(!isvalidUser){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const token = jwt.sign(
            {
                id: user.id, 
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_ID
            }
        )

        return res.status(200).json({
            success: true,
            message:"Login sccessful", token
        })


    }catch(error){
        res.status(500).json({
            message:"Error logging user",
            error: error.message
        })
    }
} 

const getMe = async(req,res) => {
    const id = req.user.id;
    try {
        const user = await User.findByPk(id);
        return res.json({
            success : true,
            user: {
                id :user.id,
                username : user.username,
                email : user.email
            },
            message : "User Fetched Sucessfully"
        })
    } catch (error) {
        return res.json({
            message : "Error Fetching User",
            error : error.message
        });
    }
}


module.exports={
    addUser,getallUser,getUserById,updateUser,deleteUser, loginUser, getMe
}