const jwt=require("jsonwebtoken")


const generateToken =(user)=>
{
    return jwt.sign(
        {
            email:user.enail,
            id:user._id,
        },
        process.env.JWT_KEY
    );
}

module.exports.generateToken=generateToken;
