

function isTokenValid(){
    const token = localStorage.getItem("token")
    if(!token) return false

    try{
        const {id, exp} = JSON.parse( atob( token.split(".")[1] ) ) 
        return exp * 1000 > Date.now()
    }catch(error){
        return false
    }
}

export {isTokenValid}