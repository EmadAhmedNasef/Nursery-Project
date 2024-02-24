
const express = require("express");
const morgan = require("morgan");

const adminRouter = require('./routes/adminRoute');
const teacherRouter = require('./routes/teacherRoute');
const childrenRouter = require('./routes/childrensRoute');




const dotenv = require("dotenv");
dotenv.config({path : "./config.env"});

const app = express();
app.use(morgan("dev"));



//1) Using MiddlewWres
app.use(express.json());




//3) Using Routes
app.use(adminRouter);
app.use(teacherRouter);
app.use(childrenRouter);







const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`app is listining on port ${port}`);
})