const wishlist = require("../models/wishListSchema")

exports.addToWishList=async(req,res)=>{
    const {id,title,price,description,category,image,rating}=req.body
    const userId = req.payload
    try{
        const existingProduct= await wishlist.findOne({userId,id})
        if(existingProduct){
            res.status(406).json("product Already Exist in Wishlist...!!")
        }else{
            const newItem = new wishlist({id,title,price,description,category,image,rating,userId})
            newItem.save()
            res.status(201).json(newItem)
        }
    }catch(err){
        res.status(401).json(err)
    }

}

exports.getWishList = async(req,res)=>{
   try{
    const userId = req.payload
    const wishListProducts = await wishlist.find({userId})
    res.status(200).json(wishListProducts)
    
   }catch(err){
        res.status(401).json(err)
   }

}

exports.deleteWish = async(req,res)=>{
    try{
        const wishId = req.params.id
        const wishDelete = await wishlist.findOneAndDelete({_id:wishId})
        res.status(200).json(wishDelete)
    }catch(err){
        res.status(401).json(err)
    }
}