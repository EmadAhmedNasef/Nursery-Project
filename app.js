// const jwt = require("jsonwebtoken");

const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const adminRouter = require('./Routes/adminRoute');
const teacherRouter = require('./Routes/teacherRoute');
const childrenRouter = require('./Routes/childrensRoute');
const swaggerDocs = require("./swagger-output.json")




const dotenv = require("dotenv");
dotenv.config({path : "./config.env"});

const app = express();
app.use(morgan("dev"));


app.use("/api-docs",
swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//1) Using MiddlewWres
app.use(express.json());




//3) Using Routes
app.use(adminRouter);
app.use(teacherRouter);
app.use(childrenRouter);



app.all("*", (req, res, next)=>{ 
    res.status(404).json({
        status : "fail",
        message : `can't find ${req.originalUrl} on this server`
    })
});



const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`app is listining on port ${port}`);
})