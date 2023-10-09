// like yaha pe vo middle ware copy kr lena app.js wala
class Errorhandler extends Error {
constructor(message,statusCode){
super(message);
this.statusCode = statusCode;
}
};
export const Middleware = (err,req,res,next)=> {
    err.message = err.message || "internal error";
    err.statusCode = err.statusCode || 500;
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
  });
  };
export default Errorhandler;
