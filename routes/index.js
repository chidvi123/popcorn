const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel=require("../models/product-model");
const userModel = require("../models/user-model");
const mongoose = require("mongoose");




router.get("/",(req,res)=>
{
    let error=req.flash("error");
    res.render("index",{error , loggedin:false});
});


router.get("/shop", isloggedin, async (req, res) => {
    try {
        let products = await productModel.find(); // Fetch products from DB
        let success=req.flash("success");
        res.render("shop", { products ,success}); // Pass products to EJS
        
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Error loading products");
    }
});

router.get("/cart",isloggedin,async(req,res)=>
{
    let user= await userModel
                  .findOne({ email : req.user.email})
                  .populate("cart");
   // const bill= Number(user.cart[0].price)+20-Number(user.cart[0].discount);
    res.render("cart",{user});
})    


router.get("/addtocart/:productid", isloggedin, async (req, res) => {
    try {
        let user = await userModel.findById(req.user._id);
        
        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/shop");
        }
        let productId = new mongoose.Types.ObjectId(req.params.productid);
        
        user.cart.push(productId);
        await user.save();
        
        req.flash("success", "Added to cart");
        res.redirect("/shop");
    } catch (err) {
        console.error("Error adding to cart:", err);
        req.flash("error", "Could not add to cart");
        res.redirect("/shop");
    }
});

module.exports=router;