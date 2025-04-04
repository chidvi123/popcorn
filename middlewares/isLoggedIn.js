const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect("/");
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        // Find user using the correct ID field
        let user = await userModel.findById(decoded.id).select("-password");

        if (!user) {
            console.log("User not found in database");
            req.flash("error", "Invalid session. Please log in again.");
            return res.redirect("/login");
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("JWT Error:", err);
        req.flash("error", "Something went wrong. Please log in again.");
        res.redirect("/login");
    }
};
