import jwt from 'jsonwebtoken';
import { User } from '../models/models.js';
export const isAuth = async(req,res,next) => {
    const {token}  = req.cookies;
    if(!token)
    {
        return res.status(404).json({
            success: false,
            message: 'no user found',
        });
    };
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id); // isse hamne vo jo async wala req padaa hua hai usme hamne ise store kra diya.
    next();// taaki next wala function call ho jaaye.


};