import express from "express";
import mongoose from "mongoose";
import routes from "./routes/user.js";
import router from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // npm i cors
// mdn web docs
import { Middleware } from "./middleware/error.js";
const app = express();
config({
   path: "./data/config.env",
});
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Database connected")).catch((e) => console.log(e));

app.use("/api/v1/users",routes);
app.use("/api/v1/task",router);
app.use(cors({
  origin: [process.env.FRONTEND_URL],// array banaa lo means kaun kaun se domain se data access kr sakte ho 
  method : ["post","put","delete","get"], // tum method bhi bataa sakte ho kaun kaun se use kr sakte ho
  credentials: true, // like isse jo headed honge vo frontend me pahoch jaayenge // like cookies wagaira kuchh nhi pahuchega
}))
app.listen(5000,() => {
    console.log(`server start working on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
app.use(Middleware);
/*app.use((err,req,res,next)=> {
  return res.status(404).json({
    success: false,
    message: err.message,
});
});*/
//means kahi pe bhi mai next ko error deke call krunga to sab kuchh band hogaa pahle ye execute hoga
