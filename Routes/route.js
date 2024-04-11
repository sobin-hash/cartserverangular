const express = require('express')
const productController = require('../controller/productController')
const userController = require('../controller/userController')
const wishlistController = require('../controller/wishListController')
const cartController = require('../controller/cartController')
const router = express.Router() //router instance from express
const jwtMiddleWare = require('../middleware/jwtMiddleware')
//getallproducts
//localhost:3000/all-products
router.get('/allproducts',productController.getAllProductsController)
router.get('/getproducts/:id',productController.getProductController)
router.post('/reg-user',userController.userRegisterController)
router.post('/login',userController.userLoginController)
router.post('/addwish',jwtMiddleWare,wishlistController.addToWishList)
router.post('/addtocart',jwtMiddleWare,cartController.addToCart)

router.get('/getwish',jwtMiddleWare,wishlistController.getWishList)
router.get('/getcartlist',jwtMiddleWare,cartController.viewCart)
router.delete('/delwish/:id',jwtMiddleWare,wishlistController.deleteWish)
router.delete('/delcart/:id',jwtMiddleWare,cartController.deleteCartItem)
router.delete('/clearcart',jwtMiddleWare,cartController.clearCart)

router.get('/cart-increase/:id',jwtMiddleWare,cartController.increaseCartQuantity)
router.get('/cart-decrease/:id',jwtMiddleWare,cartController.decreaseCartQuantity)



module.exports=router