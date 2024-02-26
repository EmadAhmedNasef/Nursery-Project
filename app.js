// const jwt = require("jsonwebtoken");

const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const adminRouter = require('./Routes/adminRoute');
const teacherRouter = require('./Routes/teacherRoute');
const childrenRouter = require('./Routes/childrensRoute');
const classRoute = require('./Routes/classRoute');
const swaggerDocs = require("./swagger-output.json")




const dotenv = require("dotenv");
dotenv.config({path : "./config.env"});

const app = express();
app.use(morgan("dev"));


app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//1) Using MiddlewWres
app.use(express.json());




//3) Using Routes
app.use(adminRouter);
app.use(teacherRouter);
app.use(childrenRouter);
app.use(classRoute);




app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
    //next();
});
  
app.use((error, req, res, next) => {
    res.status(500).json({ message: error + "" });
});
  



const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`app is listining on port ${port}`);
})