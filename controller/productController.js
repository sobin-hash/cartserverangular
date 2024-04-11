const products = require('../models/productSchema')

 exports.getAllProductsController = async(req,res)=>{
    try{
        const result = await products.find()  //to fetch all data from mongodb
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)

    }
}

exports.getProductController = async(req,res)=>{
    try{
        const result = await products.findOne({id:req.params.id})
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}