import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
    
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    // console.log(token);
    
    if(!token) return res.status(401).json({ error : "access denied : token missing"})

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return res.status(403).json({ error : "access denied: token invalid"})
        }
        
        req.user = user
        // console.log("passed authtoken");
        
        next()
    })
    
}

export {authenticateToken}