const express = require("express");
const router = express.Router();

const {registerUser,
    loginUser,
    logout}=require("../controllers/authController");

router.get("/",(req,res)=>
{
    res.send("hey its working(user)");
});

router.post("/register",registerUser);

router.post("/login",loginUser)

router.get("/logout",logout);

module.exports = router;

