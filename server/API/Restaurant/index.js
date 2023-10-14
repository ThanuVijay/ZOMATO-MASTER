//libraries 
import { express } from "express";

//database model
import { RestaurantModel } from "../../database/restaurant";

const Router = express.Router();


/* Router
    des   /:_id
    params none
    Accesss Public 
    Method GET
*/

Router.get('/', async(req,res)=>{
    try{
        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city});
        if(restaurants.length===0){
            return res.json({error: "No resturents found in this city"})
        }
        return res.json({restaurants})
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});



/* Router
    des   get individual resturent detail
    params none
    Accesss Public 
    Method GET
*/


Router.get('/:id', async(req,res)=>{
    try{
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findById(_id);
        if(!restaurant) return res.status(400).json({error: "Resturent Not Found"});

        return res.json({restaurant});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});


/* Router
    Route  /search 
    des   serch resturen detail 
    params none
    Accesss Public 
    Method GET
*/

Router.get('/search/:searchString', async(req,res)=>{
    // searchString = raj
    // results = { rajhotel, rajrow}
    try{
        const {searchString} = req.params;
        const restaurants = await RestaurantModel.find({
            name:{$regex: searchString, $options:"i"},
        });

        if (!restaurants) 
        return res
            .status(404)
            .json({error:`No resturent match with ${searchString}`});

        return res.json({restaurants})
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;