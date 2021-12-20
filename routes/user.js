import { insertUser,getUsers,getUser} from "../helper.js";
import{createConnection} from "../index.js"
import express from "express"
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"
import { auth } from "../middleware/auth.js";


const router = express.Router();


router.route("/").get(auth,async(request,response) => 
{   
   const client  =await createConnection();
   const  values =await getUsers(client,{});
   response.send( values);
})


router.route("/signup").post(async(request,response) => 
{  
    const{username,password,email} = request.body;
    const client = await createConnection();
    const hashedPassword = await genPassword(password)
    const newUser = await insertUser(client,{username:username,password:hashedPassword,email:email})
    console.log(hashedPassword,newUser);
    response.send(newUser); 
})

router.route("/login").post(async(request,response) => 
{    
   const {email,password} = request.body; 
   const client  =await createConnection();
   const user = await getUser(client,{email:email})
   const inDbStorePassword = user.password;
   const isPassMatch = await bcrypt.compare(password,inDbStorePassword)
   if(isPassMatch)
   {
        const token = jwt.sign({id:user._id},process.env.SECERET_KEY)
       response.send({message:"successfully login",token:token});
   }
   else
   {
    response.send({message:"invalidlogin"});
   }
   
}) 


// router.route("/login").post(async(request,response) => 
// {    
//    const {username,password} = request.body; 
//    const client  =await createConnection();
//    const user = await getUser(client,{username:username})
//    const inDbStorePassword = user.password;
//    const isPassMatch = await bcrypt.compare(password,inDbStorePassword)
//    if(isPassMatch)
//    {
//         const token = jwt.sign({id:user._id},process.env.SECERET_KEY)
//        response.send({message:"successfully login",token:token});
//    }
//    else
//    {
//     response.send({message:"invalidlogin"});
//    }
   
// }) 

async function genPassword(password)
{
  const salt = await bcrypt.genSalt(10);
  const  hashedPassword = await bcrypt.hash(password,salt);
  return hashedPassword;

}
   
export const userRouter = router;