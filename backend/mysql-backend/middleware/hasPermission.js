
const hasPermission = (permission) => {
    return (req, res, next) =>{
        const {permissions} = req.user
        if(!permissions || !permissions.includes(permission)){
            return res.status(403).json({message : "you don't have the permission to perform this action"})
        }
        next()
    }
    
}


export {hasPermission}