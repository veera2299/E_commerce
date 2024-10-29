const User = require('../Models/User.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//creating endpoint for registering the User

const signUp =  async (req, res) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, error: "Email already Exists! Please Login" })
    }
    let cart = [];
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const { username, email, password } = req.body;
    const user = new User({
        username, email, password, cartData: cart,
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, token });
}

//creating endpoint for userlogin

const login =  async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email })
    if (user) {
        const passCompare = password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, error: "Wrong Password" });
        }
    } else {
        res.json({ success: false, error: "Wrong Email Id" })
    }
}


//creating endpoint for adding products in cartdata

const addToCart =  async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added")
    console.log("added", req.body.itemId);

}

//creating endpoint to remove product from cartdata

const removeFromCart =  async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed")
        console.log("removed", req.body.itemId);

    }
}

//creating endpoint to get cartdata

const getCart = async(req,res)=>{
    let userData = await User.findOne({_id:req.user.id});
    res.json(userData.cartData)
    console.log("GetCart");
    
}

module.exports = {signUp , login , addToCart, removeFromCart, getCart};