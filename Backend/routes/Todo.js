const express = require("express");
const router = express.Router();
// in case of todo we will also be using the fetch user to get the id of our user
const fetchUser = require("../Middleware/fetchUser");
// got our schema
const TODO = require("../models/Todo");
const { body, validationResult } = require("express-validator");

router.get("/gettoDoList",
     fetchUser,
     async (req,res)=>{
        try {
            let user = await TODO.find({user : req.user.id})
            res.json(user)
        } catch (error) {
            res.json(error)
        }
      })


router.post(
    // add a route
    "/addListItem",
    // fetch user middleware so that we can associate a to do item with the user
    fetchUser,
     // validation array to make sure it is not empty
    [
        body("description", "Length Must be greater than 3").isLength({min : 3})
    ]
    , 
    // handler function
    async (req,res)=>{
        // checked for the errors in our body
        const errors = validationResult(req)
        if( !errors.isEmpty()){
            return res.status(400).json({ error: errors.array() });
        }

        try {
            // creating a new list item
            let todo = await TODO.create({
                description: req.body.description,
                checked: false,
                // linking it with the id from the user we got
                user: req.user.id
            })
            res.json(todo)
        } catch (error) {
            res.json(error)
        }
    })

router.delete(
    // define the path
    "/deleteListItem/:id",
    // use the middleware to get the user
    fetchUser,
    async (req, res)=>{
        try {
            let noteToBeDeleted = await TODO.findById(req.params.id)
            //  check if the item exist in db or not
            if(!noteToBeDeleted){
                return res.status(400).send("The note could not be found")
            }
            // means we get the item now we need to check if the user is same or not
            if(req.user.id != noteToBeDeleted.user.toString()){
                return res.status(400).send("Access denied")
            }

            // the access is allowed and we got the user so we can delete now
            let item = await TODO.findByIdAndDelete(req.params.id)
            res.json(item)
        } catch (error) {
            res.send(error)
        }
    })

router.put(
    //  define the route
    "/updateListItem/:id",
    // add a middleware
     fetchUser,
     // no need to add a validation array now we know that if its update endpoint means we will be 
     // getting some changed so we need to create a new note and we will use checks to see that if the
     // changed need to be made or not
    async (req , res)=>{
        let {description, checked} = req.body
        try {
            let noteToBeUpdated = await TODO.findById(req.params.id)
            if(!noteToBeUpdated){
                return res.status(400).send("The note could not be found")
            }

            if(req.user.id != noteToBeUpdated.user.toString()){
                return res.status(400).send("Access denied")
            }

            let newtodo = {}
            if(description){newtodo.description = description}
            if(checked!=null){newtodo.checked = checked}

            let item = await TODO.findByIdAndUpdate(req.params.id, {$set  : newtodo}, {new :true})
            res.send(item)


        } catch (error) {
            res.json(error)
        }
    })


module.exports = router;
