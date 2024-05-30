const {User,Account} = require('../modals/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../config');
const zod = require('zod');

const UserSignup = async (req, res) => {
    try {
        const {first_name, last_name, email, password } = req.body;
        const schema = zod.object({
            first_name: zod.string().min(3).max(20),
            last_name: zod.string(),
            email: zod.string().email(),
            password: zod.string()
        });
        schema.safeParse({first_name, last_name, email, password});

        const userExists = await User.findOne({ email});
        if(userExists) {
            return res.status(411).json({ error: "Email already taken / Incorrect inputs"});
        }
        var salt = bcrypt.genSaltSync(10);
        const newPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            first_name, last_name, email, password:newPassword 
        })
        const userId = user._id;
        
        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })

        const token = jwt.sign({
            userId
        }, JWT_SECRET, { expiresIn: '7d' });
    
        res.json({
            message: "User created successfully",
            token: token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const UserLogin = async (req, res) => {
    const signinBody = zod.object({
        email: zod.string().email(),
        password: zod.string()
    })

    try {
        console.log("a");
        const { success } = signinBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }
        console.log("b");

        const user = await User.findOne({
            email: req.body.email,
        });
        if (!user) {
            return res.status(411).json({
                message: "Please Signup First"
            })
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({
            message: "Invalid credentials"
          });
        }
        
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET,{expiresIn:"1h"});

        return res.json({
            token: token
        })
        
    } catch (error) {
        return res.status(411).json({
            message: "Error while logging in"
        })  
    }
}

const UserUpdate = async (req, res) => {
    try {
        const updatedBody = zod.object({
            first_name: zod.string().optional(),
            last_name: zod.string().optional(),
            password: zod.string().optional()
        })
        const { success } =updatedBody.safeParse(req.body);

        if (!success) {
            res.status(411).json({
                message: "Error while updating information"
            })
        }
        const updatedUser = await User.updateOne({ _id: req.userId }, req.body);
	if(!updatedUser){
        return res.status(411).json({ error: "Error while updating information/No user Found" });
    }
    res.json({
        message: "Updated successfully"
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}   

const UserFilter = async (req,res) =>{
    try {
        const filter = req.query.filter || "";
        const users = await User.find({
            $or: [
                { first_name: { $regex: filter, $options: "i" } }, // to make it case insensitive(case insensitive search)
                { last_name: { $regex: filter, $options: "i" } }
            ]
        });
        res.json({
            user: users.map(user => ({
                _id: user._id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name
            }))
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    UserSignup,
    UserLogin,
    UserUpdate,
    UserFilter
}
