import { sendcookie } from "../utilits/features.js";
import {User} from "/home/raman/Desktop/todoproject/routespillting/models/models.js";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(404).json({
                success: false,
                message: 'This email address is already registered',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        sendcookie(newUser,res,"Registered successfully",201);

    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Registration failed',
        });
    }
};

export const login = async(req,res,next) => {
    const {email,password} = req.body;
    const user = await User.findOne({email}).select("+password");
    if(!user)
    {
        return res.status(404).json({
            success: false,
            message: 'Invalid email or pass',
        });
    };
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        return res.status(404).json({
            success: false,
            message: 'Invalid email or pass',
        });
    };
    sendcookie(user,res,`Welcome back, ${user.name}!`,201);
};

export const getallusers = async(req,res) => {

};
export const getUserdetails = (req,res)=>
{

    res.status(200).json({
        success:true,
        user: req.user,
    });
};
export const logout = (req,res) => {

    res.status(200).cookie("token", "" , {expires: new Date(0),
        sameSite: "none", // as hamara frontend aur backend ka url different hai isliye  ?? isme bhi kuchh lax aur none ka concept hota hai
        //  secure : true, // ye dono krne ke baad abb postman me cookies nhi aayengi
          secure : process.env.NODE_ENV === "Development" ? false : true,}).json({
        success:true,
        message: "logout successful",
    });
};
