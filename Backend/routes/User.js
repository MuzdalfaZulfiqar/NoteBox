const express = require("express");
// got the user schema
const User = require("../models/User");
const router = express.Router();
// step 1 of using express-validator
const {body, validationResult} = require("express-validator")
// step 1 of using bcryptjs
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")
const jwt_secret = "ThisIsASecret"  
const fetchUser = require("../Middleware/fetchUser")

let success;

// for accessing what is within the request body we use req.body byt we have a problem we will not
// get what it is without a middleware of use(express.json) in index.js file

// +++++++++++++++++++++++++ Route 1 (creating/regestering a user)
// method 1 of creating a user and then saving in database
// create a user using POST "/api/auth"  (does not require (login)) meanscreate a user using post and then endpoint()
router.post("/createUser", 
    // step 2 define validation rules
    [   
        body("name").isLength({min:3}),
        // adding a custom error message here
        body("email", "Enter a valid email").isEmail(),
        // body("email").isEmail(),
        body("password").isLength({min:5})

    ]
    // we are using promises which can lead to some problems so we will be making this function as
    // asyncs because within this function we are going to use awaitt
    , async (req,res)=>{
    // know if you got any error or not
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        // if error return bad request and errors
        success = false
        return res.status(400).json({success, error : errors.array()})
    }

    /**k,
     the statement of .json({error : errors.array()}) here means that if you get the error then 
     convert it into the array and store in error var now errors in this case is the result that 
     we will be getting from the valiadtionResult which is basically our fucntion that will hold
     the record of the our validations based on our array which was our second argument
     {
  "error": [
    {
      "type": "field",
      "value": "muzgmail.com",
      "msg": "Invalid value",
      "path": "email",
      "location": "body"
    }
  ]
}
     */
// using .then catch format
        // User.create({
        //     name : req.body.name,
        //     email : req.body.email,
        //     password : req.body.password
        // })
        // .then(user=>res.json(user))
        // .catch(error=>
        // {
        //     console.log(error)
        //     res.json({error :"Please enter a unique value", message : error.message})
        // }
        // )

        // using awaut format
        try
        {        
        // check whether user with same email exists or not
        // since it is a promise so we need await
        let user = await User.findOne({email : req.body.email});
        // this will either give null or some user having null ids good for us because that means such a user does not exist
        if(user){
          success = false
            return res.status(400).json({ success, error : "sorry a user with this email already exists"})
        }

        // generate a salt
        const salt = await bcrypt.genSalt(10);
        // create a hashedPassword of password and salt and store it in secPassword 
        // this will be stored to DB
        const secPassword  = await bcrypt.hash(req.body.password, salt)
         // since it is a promise so we need await
        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            // using var secPassword for our password so we can deal with hashing
            password : secPassword
        });
        // getting the data of user id so we can pass this as a payload for now to get a token against it
        const data = {
          user :{
            id : user.id
          }
        }
        console.log(data.user.id)
        // sign here will take the payload and our secret key  with the help of which we are signing our token
        success = true
        const token = jwt.sign(data, jwt_secret)
        // logging our token we goth
        res.json({success,token})
        // console.log(token)
      }
      catch(error){
        // console.log(error);
        res.status(500).send("some error")
      }
})

// method 2 of creating a user
// router.post("/book", (req, res)=>{
//     const user  = new User(req.body)
//     user.save()
//     console.log(req.body)
// })

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Route # 2 - authenticate a user /api/auth/login (lo login requires)

router.post("/login", 
  // step 2 define validation rules
  [   

      body("email", "Enter a valid email").isEmail(),
      body("password", "Password cannot be empty").exists(),


  ]
  , async (req,res)=>{
    // check if got any error or not
    let errors = validationResult(req)
    if(!errors.isEmpty()){
      // we are making this var sucess so we will be able to know that we got 
//some success or not at frontend which will help us to deal with whether or not to allow component rendering
        success = false;
        return res.status(400).json({success, error : errors.array()})
    }

    // get the email and password from the req.body last time we were creating it now we need to check it
    let {email, password} = req.body;
    
    try {
      // find the user with such email now we do not have password in our db so we will be cheching our
      // password from  bcrypt.js
      let user = await User.findOne({email}) 
      // this user will have all the properties including the id from database
      if(!user){
        success = false
        return res.status(400).json({success, error :"Please try to enter a correct email"})
      }

      //  we need to compare the password that the user will enter and the hashed password from our database
      const passwordCompare =await bcrypt.compare(password, user.password)
      if(!passwordCompare){
        success =false;
        return res.status(400).json({success,error :"Please try to enter a correct password"})
      }

      const data = {
        user :{
          id : user.id
        }
      }
      // here wrapping our payload in data is just a way to pass the data 
      // whenever we will need to get the data that we passed as a payload we will be getting it 
      // with the name as we will be getting in verify
      const token = jwt.sign(data, jwt_secret)
      success = true
      res.json({success,token})

    } catch (error) {
      console.log(error)
    }

  }
)
// from the frontend perspective lets say the user have logged in now first of all the validation rules will be checked whcih has already been implemented on frontend so no worries for such kind of erros the the server will be checking if any uuser with such email exist or not if yes then it means that the email is correct and then for password it will verify the user entered password by creating a hash of it and comparing with the one in database and all this will be done automatically by compare method now we have crossed all the hurdles we need to create a jwt token and send in the response body 



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Route # 3 - get loggedin userdetail using post user /api/auth/getUser (login requires)


router.get("/getUser", 
    // step 2 define validation rules is not needed now to get the data of the user
    // now we need a middleware in this case so we will be using it 
    fetchUser,
    // step 3 the handler function
    async (req,res)=>{
    try{       
      // we need to get the date based on id
      const userId = req.user.id
      // get the user from the database but we do not need any password now so 
      const user = await User.findOne({"_id" : userId}).select("-password")
      res.send(user)
    }
    catch(error){
      console.log(error)
      res.status(400).send("some error has occcured in middleware")
    }
    
  }
)

module.exports = router;