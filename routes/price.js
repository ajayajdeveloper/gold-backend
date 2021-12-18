import { getPrice, getPriceById, deletePriceById, insertPrice ,updatePriceById,replacePriceById} from "../helper.js";
import{createConnection} from "../index.js"
import express from "express"
import { auth } from "../middleware/auth.js";
const router = express.Router();



router.route("/")
.get(auth,async(request,response) => 
{  
    const client = await createConnection();
    const values = await getPrice(client,{  })
    response.send(values);
})
.post(auth,async(request,response) => 
{  
    const client = await createConnection();
    const price =request.body;
    const values = await insertPrice(client,price)
    response.send(values);
});



router.route("/:id")
.get(auth, async (request,response) =>  
{
    const id = request.params.id;     
    const client = await createConnection();
    const value = await getPriceById(client,id)
    response.send(value);
})
.patch(auth, async (request,response) =>  
{
    const id = request.params.id;     
    const client = await createConnection();
    const newprice =request.body;
    const value = await updatePriceById(client,id,newprice)
    response.send(value);
})
.put(auth, async (request,response) =>  
{
    const id = request.params.id;     
    const client = await createConnection();
    const newprice =request.body;
    const value = await replacePriceById(client,id,newprice)
    response.send(value);
})
.delete( auth,async (request,response) =>  
{
    const id = request.params.id;     
    const client = await createConnection();
    const value = await deletePriceById(client,id)
    response.send(value);
});


router.get("/name/:statename",auth,async(request,response) => 
{   
    const statename = request.params.statename; 
    const client = await createConnection();
    const values = await getPrice(client,{ state:statename })
    response.send(values);
});




export const priceRouter = router;