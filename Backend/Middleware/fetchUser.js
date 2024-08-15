const jwt = require("jsonwebtoken")
const jwt_secret = "ThisIsASecret"  

const fetchUser = (req, res, next)=>{
    // get the user from jwt token and add id to req object

    const token = req.header("auth-token")
    if(!token){
        return res.status(401).send({error : "no token"})
    }

    try {        
        // if any token received verify that wether it is from our secret key or not
        const data = jwt.verify(token, jwt_secret)
        // This will return us the object within which our user object is stored which is data object
        // within which our user object is defined 
        //so we will be using it know
        req.user = data.user
        next()
    } catch (error) {
       res.json(error)
    }

}

module.exports = fetchUser;