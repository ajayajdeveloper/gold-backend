import express from "express"
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import cors from "cors"
import {priceRouter} from "./routes/price.js"
import {userRouter} from "./routes/user.js"


dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())

const PORT =process.env.PORT;



export async function createConnection()
{
    const MONGO_URL =process.env.MONGO_URI;
    const client = new MongoClient(MONGO_URL);
    try {
        await client.connect();
        return client;
        } 
    catch (err) {
        console.log(err);  
      } 
}

app.get("/",(request,response) => 
{
    response.send("hi this is gold calc ");
});

app.use("/price",priceRouter)

app.use("/user",userRouter)
 
app.listen(PORT, ()=> console.log("the server is started ",PORT)); 


