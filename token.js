const jwt = require("jsonwebtoken");
const SECRET_KEY = "123456";

const jwtMiddleWere =(req, res, next)=>
{
    const token = req.headers.authorization.split(' ')[1];
    if(!token)
    {
      res.sendStatus(404).send("hii");

    }

    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user(decoded);
        next();

    }
    catch(err)
    {
        res.send("error");
    }

}

const genrateToken = (userData)=>
{
    return jwt.sign(userData, SECRET_KEY, );
}



module.exports = {jwtMiddleWere, genrateToken};