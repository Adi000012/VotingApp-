const express = require("express");
const router = express.Router();

const users = require("./../models/userSchema");
const candidate = require("./../models/candidateSchema");

const { jwtMiddleWere, genrateToken} = require("../token");



router.post("/login", async (req, res) => {
  try {
    const { adharCardNumber, password } = req.body;

    // Validate required fields (email and password)
    if (!adharCardNumber) {
      return res.status(400).json({ message: "Missing required fields (adharCardnumber and password)" });
    }

    // Attempt to find user by email
    const user = await users.findOne({ adharCardNumber });

    // Handle user not found gracefully
    if (!user) {
      return res.status(401).json({ message: "Invalid adharcardNumber or password" }); 
    }

    const isPasswordValid = await users.findOne({ password });

    // Handle incorrect password gracefully
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    else if(isPasswordValid == password)
    {
      console.log("all is ok")
    }

    const payload = 
    {
      id: user.id
    };

    const token = genrateToken(payload);
    res.json({ token });
  } 
  
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});





router.post('/signup', async (req, res) => 
{
    try{
        const data = req.body;

        //we store all person table data in newPerson 
        const newUser = new users(data);

        //and then we save our newPerson Function 
        const save = await newUser.save(); 

        const payload =
        {
            id : save.id
        }

        console.log(JSON.stringify(payload));

        const token = genrateToken(payload) 
        console.log(token);

        res.json({save : save, token : token });
    }
    
    catch(err)
    {
        res.send("Somthing Get Error"+ err);
    }
});


router.get("/home", (req, res)=>
{
  res.send("hi");
})



router.get("/profile", jwtMiddleWere,async (req,res)=>
{
    try{
    const userData = req.user;
    const userId = userData.id;
    const user = await users.findById(userId);

    res.json(user);}

    catch(err)
    {
        res.send(err);
    }
})



router.put("/profile/password",jwtMiddleWere, async (req, res) => {
    try {
      const userId = req.user;
      const {currentPassword, newPasssword} = req.body;

      const isPasswordValid = await users.findOne({ currentPassword });

      // Handle incorrect password gracefully
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }


      else if(isPasswordValid == currentPassword)
      {
        users.password = newPasssword;
        await users.save();

        res.send("password Changed");
      }
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error"); 
    }
  });




   
module.exports= router;