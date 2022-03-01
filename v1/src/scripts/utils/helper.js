import cryptoJs from "crypto-js";
import JWT from "jsonwebtoken";

const passwordToHash = (password) => {
    return cryptoJs.HmacSHA256(password, cryptoJs.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString()
}
const generateAccessToken = (user) => {
    return JWT.sign({name: user.email, ...user},process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn:"1w"}) // JWT needs a name property
}
const generateRefreshToken = (user) => {
    return JWT.sign({name: user.email, ...user}, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn:"1w"}) // JWT needs a name property
}

export { passwordToHash, generateAccessToken, generateRefreshToken}