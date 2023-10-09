import jwt from "jsonwebtoken";

export const sendcookie = (newUser,res,message,statusCode = 200)=> {
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

    
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: "none", // as hamara frontend aur backend ka url different hai isliye  ?? isme bhi kuchh lax aur none ka concept hota hai
      //  secure : true, // ye dono krne ke baad abb postman me cookies nhi aayengi
        secure : process.env.NODE_ENV === "Development" ? false : true,
    }); 

    res.status(statusCode).json({
        success: true,
        message: message,
    });
}
// always remember king cookies ke option dono me same hone chahiye otherwise  cheeje kaam nhi krengi