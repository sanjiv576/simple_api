const jwt = require('jsonwebtoken');


// middleware function for token verification
const verifyUser = (req, res, next) =>{
    // console.log('inside middleware');

    // store token  --> Note: it contains extra information as well with token which needs filteration later on
    let token = req.headers.authorization;

    // if the user does not send token in the header
    if(!token) return res.status(401).json({error: 'auth token not present'});

    // read the token 
    // console.log(token);

    // remove Bearer from the token , which is unwanted by splitting with white space that stores in array
    // and storing the token by its index from the array
    token = token.split(' ')[1];
    // console.log(token);

    // now verify the token after gettting it

    // NOte: here, payload contains user id, username and full name as these are stored while loging in
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if(err) return res.status(401).json({error : err.message});

        // store the payload in req.user , in future, to get user data from req.user rather than reading from db
        req.user = payload;

        console.log('Done');
         // move to the destined endpoint
    next();
    });
   

}


module.exports = {verifyUser};