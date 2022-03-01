import httpStatus from "http-status"
import JWT from "jsonwebtoken"

const authenticateToken = (req,res,next) => {
    const authHeader = req.headers["authorization"]
    // const authHeader = req.headers.authorization
    // const token = authHeader && authHeader.split(" ")[1]
    const token = authHeader?.split(" ")[1] || null
    console.log('token :>> ', token);

    if (token === null) {
        return res.status(httpStatus.UNAUTHORIZED).send({error: "Please Signin"})
    }
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err,user) => {
        if(err) return res.status(httpStatus.FORBIDDEN).send({eror : err})
        req.user = user
        next()
    })
}

export default authenticateToken