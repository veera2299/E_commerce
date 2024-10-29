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

const Backend_URL = "https://ecommerce-backend-q5i0.onrender.com";
// const Backend_URL = "http://localhost:4000"

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
        image_url: `images/${req.file.filename}`
    })
})

app.use('/product', productRoutes);
app.use('/user', userRoutes);

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server Running on Port " + PORT);
    } else {
        console.log(error);

    }
})