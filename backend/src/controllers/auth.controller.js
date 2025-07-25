import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req,res){
    const {email, password, fullName} = req.body;

    try {
        if(!email || !password || !fullName){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 character"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "Email Already Exist" });
        }

        const idx = Math.floor(Math.random() * 100) + 1; //random generate between 1-100
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}`

        //finally creating new User
        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic:randomAvatar
        })

        //todo : create user in stream as well

        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn: "7d"
        })

        res.cookie("jwt", token,{
            maxAge : 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, //prevent xss attack 
            sameSite: "strict", //prevent csrf attack
            secure : process.env.NODE_ENV === "production",
        })

        res.status(201).json({success:true, user:newUser})
    } catch (error) {
        console.log("Error in signup", error)
        res.status(500).json({message : "Internal Server Error"})
    }
}

export async function login(req,res){
    res.send("login route");
}

export function logout(req,res){
    res.send("logout route");
}