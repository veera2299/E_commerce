const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors');
const dotenv = require('dotenv')
const productRoutes = require('./Routes/productRoutes.js')
const userRoutes = require('./Routes/userRouter.js')

const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 4000;
app.use(express.json());

//database connection

mongoose.connect("mongodb+srv://E-commerce:E-commerce@cluster0.it8s6.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Db connected Successfully")
    )

//API creation
app.get('/', (req, res) => {
    res.send('Express App is running')
})

//image storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage });

//creating upload endpoint for images 

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})

app.use('/product',productRoutes);
app.use('/user', userRoutes);


// //schema for creating products

// const Product = mongoose.model("Product", {
//     id: {
//         type: Number,
//         required: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     image: {
//         type: String,
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//     },
//     new_price: {
//         type: Number,
//         required: true,
//     },
//     old_price: {
//         type: Number,
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
//     available: {
//         type: Boolean,
//         default: true
//     },

// })

// app.post('/addproduct', async (req, res) => {

//     const { name, image, category, new_price, old_price } = req.body;

//     let products = await Product.find({});
//     let id;
//     if (products.length > 0) {
//         const last_product_aray = products.slice(-1);
//         const last_product = last_product_aray[0];
//         id = last_product.id + 1;
//     } else {
//         id = 1;
//     }

//     const product = new Product({
//         id, name, image, category, new_price, old_price
//     });
//     await product.save();
//     return res.json({ success: true, name: name });
// })


// //creating API for deleting Products

// app.post('/removeproduct', async (req, res) => {
//     await Product.findOneAndDelete({ id: req.body.id });
//     res.json({ success: true, name: req.body.name });

// })

// //creating API for getting all products

// app.get('/allproducts', async (req, res) => {
//     let products = await Product.find({});
//     res.json(products);

// })

//create Schema for User Model

// const Users = mongoose.model('Users', {
//     name: {
//         type: String,
//     },
//     email: {
//         type: String,
//         unique: true,
//     },
//     password: {
//         type: String,
//     },
//     cartData: {
//         type: Object,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     }

// })

//creating endpoint for registering the User

// app.post('/signup', async (req, res) => {
//     let check = await Users.findOne({ email: req.body.email });
//     if (check) {
//         return res.status(400).json({ success: false, error: "Email already Exists! Please Login" })
//     }
//     let cart = [];
//     for (let i = 0; i < 300; i++) {
//         cart[i] = 0;
//     }
//     const { username, email, password } = req.body;
//     const user = new Users({
//         username, email, password, cartData: cart,
//     })
//     await user.save();

//     const data = {
//         user: {
//             id: user.id
//         }
//     }

//     const token = jwt.sign(data, 'secret_ecom');
//     res.json({ success: true, token });
// })

// //creating endpoint for userlogin

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     let user = await Users.findOne({ email })
//     if (user) {
//         const passCompare = password === user.password;
//         if (passCompare) {
//             const data = {
//                 user: {
//                     id: user.id
//                 }
//             }
//             const token = jwt.sign(data, 'secret_ecom');
//             res.json({ success: true, token })
//         } else {
//             res.json({ success: false, error: "Wrong Password" });
//         }
//     } else {
//         res.json({ success: false, error: "Wrong Email Id" })
//     }
// })

//Creating endpoint for newCollection data

// app.get('/newcollections', async (req, res) => {
//     let products = await Product.find({})
//     let newcollection = products.slice(1).slice(-8);
//     res.send(newcollection);

// })

//creating endpoint for popular in women section

// app.get("/popularinwomen", async (req, res) => {
//     const products = await Product.find({ category: "women" })
//     const popular_in_women = products.slice(0, 4);
//     res.send(popular_in_women);

// })

//creating middleware to fetch use

// const fetchUser = async (req, res, next) => {
//     const token = req.header('auth-token');
//     if (!token) {
//        return res.status(401).send({ error: "Please authenticate using valid Token" })
//     } else {
//         try {
//             const data = jwt.verify(token, 'secret_ecom');
//             req.user = data.user;
//             next();
//         } catch (error) {
//             res.status(401).send({ error: "please authenticate using valid token" })
//         }
//     }
// }

//creating endpoint for adding products in cartdata

// app.post('/addtocart', fetchUser, async (req, res) => {
//     let userData = await Users.findOne({ _id: req.user.id });
//     userData.cartData[req.body.itemId] += 1;
//     await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//     res.send("Added")
//     console.log("added", req.body.itemId);

// })

//creating endpoint to remove product from cartdata

// app.post("/removefromcart", fetchUser, async (req, res) => {
//     let userData = await Users.findOne({ _id: req.user.id });
//     if (userData.cartData[req.body.itemId] > 0) {
//         userData.cartData[req.body.itemId] -= 1;
//         await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//         res.send("Removed")
//         console.log("removed", req.body.itemId);

//     }
// })

//creating endpoint to get cartdata

// app.post('/getcart', fetchUser, async(req,res)=>{
//     let userData = await Users.findOne({_id:req.user.id});
//     res.json(userData.cartData)
//     console.log("GetCart");
    
// })

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server Running on Port " + PORT);
    } else {
        console.log(error);

    }
})