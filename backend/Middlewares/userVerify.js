const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//creating middleware to fetch use

dotenv.config();

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
       return res.status(401).send({ error: "Please authenticate using valid Token" })
    } else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.user;
            
            next();
        } catch (error) {
            res.status(401).send({ error: "please authenticate using valid token" })
        }
    }
}

module.exports = fetchUser;