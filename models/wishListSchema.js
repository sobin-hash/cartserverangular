const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({

    id:{
        type:Number,
        required:true,
        
    },
    title:{
        type:String,
        required:true

    },
    price:{
        type:Number,
        required:true

    },
    description:{
        type:String,
        required:true

    },
    category:{
        type:String,
        required:true

    },
    image:{
        type:String,
        required:true

    },
    rating:{
        rate:{
            type:Number,
            required:true
        },
        count:{
            type:Number,
            required:true
        }
    },
    userId:{
        type:String,
        required:true
    }


})

const wishlist = mongoose.model('wishlist',wishListSchema) //users inside the braces is /will be the collection name in mongodb
module.exports  = wishlist