const express = require("express");
const userRouter = require("./routers/users");
const todoRouter = require("./routers/todos")


// connection to db 

require("./db/mongoose");

const app = express();


app.use(express.json());

// use userRouter and todoRouter
app.use(userRouter);

app.use(todoRouter);


const port = 3000
app.listen(port,()=>{console.log("Server is running")})
