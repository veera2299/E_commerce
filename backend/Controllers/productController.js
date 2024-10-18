const Product = require("../Models/Product");


const addProduct =  async (req, res) => {
    try {
        const { name, image, category, new_price, old_price } = req.body;

        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            const last_product_aray = products.slice(-1);
            const last_product = last_product_aray[0];
            id = last_product.id + 1;
        } else {
            id = 1;
        }

        const product = new Product({
            id, name, image, category, new_price, old_price
        });
        await product.save();
        return res.json({ success: true, name: name });
    } catch (error) {
        console.log(error);
        res.status(500).json("internal server error");
    }

}
// //creating API for deleting Products

const removeProduct =  async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });

}
//creating API for getting all products

const allProducts =  async (req, res) => {
    let products = await Product.find({});
    res.json(products);

}

//Creating endpoint for newCollection data

const newCollections =  async (req, res) => {
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8);
    res.send(newcollection);

}

//creating endpoint for popular in women section

const popularInWomen =  async (req, res) => {
    const products = await Product.find({ category: "women" })
    const popular_in_women = products.slice(0, 4);
    res.send(popular_in_women);

}

module.exports = {addProduct, removeProduct , allProducts , newCollections , popularInWomen };