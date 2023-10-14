//libraries 
import { express } from "express";

//database model
import { FoodModel } from "../../database/food";

const Router = express.Router();


/* Router
    route /r/:id
    des   GET all food on perticular resturent 
    params none
    Accesss Public 
    Method GET
*/

Router.get('/r/:_id', async(req,res)=>{
    try{
        const {_id} = req.params;
        const foods = await FoodModel.find({restaurant:_id});
    
        return res.json({foods})
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});


/* Router
    route /c/:category 
    des   GET all food on perticular category 
    params none
    Accesss Public 
    Method GET
*/



export default Router;