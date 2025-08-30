import express from 'express'
import User from '../models/User.js'

const router = express.Router();

//Register
router.post('/register', async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            res.status(400).json({message: "Email already exists"});
        }

        const newUser = new User({username, email, password});
        await newUser.save();
        res.status(201).json({message: "User Existed Successfully"});
    } catch (err){
        res.status(500).json({error: err.message});
    }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;