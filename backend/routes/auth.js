const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");


const JWT_SECRET = "ThisIsAuthenticationKey";

// Route 1 : Create a user using POST "/api/auth/createuser"

router.post("/createuser",[
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be at least 5 characters").isLength({min: 5,}),
    body("email", "Enter valid email").isEmail(),
  ],
  async (req, res) => {
    let success= false;
    //  If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // check whether the user with same email exists already
      let user = await User.findOne({ success, email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry the user with this email already exists." });
      }
      // Password hashing and salt using bcrypt library
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //Create a user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data ={
        user:{
          id : user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      // console.log(authToken);
      success=true;
      res.json({ success,authToken });

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

// Rpoute 2 : Authenticate a user using POST "/api/auth/login"

router.post('/login', [
  body ('email','Enter a valid email').isEmail(),
  body ('password','Password cannot be blank').exists(),
], async (req,res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const{email,password} = req.body;
  try{
      let user = await User.findOne({email});
      if (!user){
        success = false;
        return res.status(400).json({ errors : "Please try to login with correct credentials."});
      }
      const pwdCompare = await bcrypt.compare(password, user.password);
      if(!pwdCompare){
        success = false;
        return res.status(400).json({ errors : "Please login with correct credentials."});
      }
      const data ={
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      // console.log(authToken);
      success=true;
      res.json({ success,authToken });

  }catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server error");
  }

}) 

// Rpoute 3 : Get loggedin user details using POST "/api/auth/getuser" Login required

router.post('/getuser',fetchuser, async(req,res) => {
try{
  userid=req.user.id
  const user = await User.findById(userid).select("-password")
  res.send(user)
}catch(error){
  console.log(error.message);
  res.status(500).send("Internal Server error");
}
})

module.exports = router;
