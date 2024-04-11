const jwt=require('jsonwebtoken')

const jwtMiddleWare=(req,res,next)=>{
    console.log("Inside jwtMiddleWare");
    try{
        const token=req.headers.authorization.split(" ")[1]  //token from request header (Bearer [token] )
        console.log(token);
        if(token){
            const jwtResponse=jwt.verify(token,process.env.JWT_SECRETKEY)
            console.log(jwtResponse)
            req.payload=jwtResponse.userId  //asign userId from token as payload
            next()
        }else{
            res.status(406).json("token not available")
        }
        
    }catch(err){
        console.log(err)
        res.status(401).json("Authorization failed...please login..")
    }

}

module.exports=jwtMiddleWare

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZlNjdhZmY0NjI4OGExZDljZWJkNWYiLCJpYXQiOjE3MTE0MjU3ODB9.1XejGS1bgOdzCJjtKyfHATExvoSWKxwwYBXYKeyq1bo
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZlNjdhZmY0NjI4OGExZDljZWJkNWYiLCJpYXQiOjE3MTE0MjU3ODB9.1XejGS1bgOdzCJjtKyfHATExvoSWKxwwYBXYKeyq1bo