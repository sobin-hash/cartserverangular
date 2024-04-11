const carts = require('../models/cartSchema')

exports.addToCart = async (req, res) => {
    try {
        const { id, title, price, image, quantity } = req.body
        const userId = req.payload
        const existingProduct = await carts.findOne({ id, userId })
        if (existingProduct) {
            existingProduct.quantity++
            existingProduct.totalPrice = existingProduct.price * existingProduct.quantity
            await existingProduct.save()
            res.status(200).json(existingProduct)

        }
        else {
            const newCart = new carts({
                id, title, price, image, quantity, totalPrice: price, userId
            })
            await newCart.save()
            res.status(200).json("Item added to cart!!")
        }
    } catch (err) {
        console.log(err)
        res.status(401).json(err)

    }
}


exports.viewCart = async (req, res) => {
    try {
        const userId = req.payload
        const data = await carts.find({ userId })
        res.status(200).json(data)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.deleteCartItem = async (req, res) => {
    try {
        const cartId = req.params.id
        const data = await carts.findOneAndDelete({_id: cartId })
        res.status(200).json(data)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.increaseCartQuantity = async(req,res)=>{
    try {
        const cartId = req.params.id
        const existingProduct = await carts.findOne({_id: cartId })
        existingProduct.quantity++
        existingProduct.totalPrice = existingProduct.quantity*existingProduct.price
        await existingProduct.save()
        res.status(200).json("Quantity increased by one!!")
    } catch (err) {
        res.status(401).json(err)
    }

}

exports.decreaseCartQuantity = async(req,res)=>{
    try {
        const cartId = req.params.id
        const existingProduct = await carts.findOne({_id: cartId })
        if(existingProduct.quantity>1){
        existingProduct.quantity--
        existingProduct.totalPrice = existingProduct.quantity*existingProduct.price
        await existingProduct.save()
        res.status(200).json("Quantity increased by one!!")

        }else{
            res.status(401).json("Minimum quantity reached!!")
        }
        
    } catch (err) {
        res.status(401).json(err)
    }

}


exports.clearCart = async (req, res) => {
    try {
        const userId = req.payload
        const data = await carts.deleteMany({userId})
        res.status(200).json(data)
    } catch (err) {
        res.status(401).json(err)
    }
}


