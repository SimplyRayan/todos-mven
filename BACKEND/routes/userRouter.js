const express = require("express");
const router = express.Router();

const User = require("../DB/models/users");
const jwt = require("jsonwebtoken");
//

router.post("/signup", async (req, res) => {
  username = req.body.email;
  password = req.body.password; 

  console.log("SIGNUP", req.body);

  if (!username || !password) {
    return res.status(400).send({ error: "REQUIRED INFO WAS NOT PROVIDED" });
  }

  // passwords are not encrypted right now, they should be hashed later 
  const newUser = User({ username: username, password: password }); 

  try {

    await newUser.save();

    token = newUser.generateAuthToken();
    
    return res
      .status(201)
      .send({ message: "User was created successfuly", token });

  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Could not process request" });
  }
});

// -------------------------------------------------------------------------- //
router.post("/login", async (req, res) => {
  username = req.body.email;
  password = req.body.password;

  console.log("LOGIN ATTEMPT", req.body);

  if (!username || !password) {
    return res.status(400).send({ error: "REQUIRED INFO WAS NOT PROVIDED" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send({ error: "INVALID CREDINTIALS" });
    }
    if (user.password !== password)
      return res.status(401).send({ error: "INVALID CREDINTIALS" });

    const token = user.generateAuthToken();
  
    return res
      .status(201)
      .send({ message: "Login was successful", token });
  } catch (err) {
    return res.status(500).send({ error: "Could not process request" });
  }

  //
});

// -------------------------------------------------------------------------- //

module.exports = router;
