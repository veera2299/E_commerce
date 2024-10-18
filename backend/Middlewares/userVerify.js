const jwt = require('jsonwebtoken');

//creating middleware to fetch use

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
       return res.status(401).send({ error: "Please authenticate using valid Token" })
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            
            next();
        } catch (error) {
            res.status(401).send({ error: "please authenticate using valid token" })
        }
    }
}

module.exports = fetchUser;