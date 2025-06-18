
const hasPermission = (permission) => {
    return (req, res, next) =>{
        const {permissions} = req.user
        console.log("permission : "+permission);
        console.log(permissions);
        console.log(permissions.includes(permission));
        
        
        if(!permissions || !permissions.includes(permission)){
            return res.status(403).json({message : "you don't have the permission to perform this action"})
        }
        console.log("passed has permissionnnn");
        
        next()
    }
    
}


export {hasPermission}