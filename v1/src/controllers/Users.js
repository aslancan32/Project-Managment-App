import {insert, list, loginUser} from "../services/Users.js";
import httpStatus from "http-status";
import {generateAccessToken, generateRefreshToken, passwordToHash} from "../scripts/utils/helper.js";

const index = (req,res)=> {
    console.log("Get Users"); 
    list()
        .then(response => res.status(httpStatus.OK).send(response))
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const create = (req,res)=> {
    console.log("Post User"); 
    req.body.password = passwordToHash(req.body.password)
    insert(req.body)
        .then((response) => {
            res.status(httpStatus.CREATED).send(response)
            console.log("User "+response.full_name + " created");
            }
        ).catch((e) => {
            console.log(e);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        }
    )
}
const login = (req,res) => {
    req.body.password = passwordToHash(req.body.password)
    loginUser(req.body)
        .then((user) => {
            if(!user) return res.status(httpStatus.NOT_FOUND).send({"message":"User Not Found"})
            user = {
                ...user.toObject(),
                tokens: {
                    accessToken: generateAccessToken(user),
                    refreshTokens: generateRefreshToken(user)
                    
                }
            }
            delete user.password
            res.status(httpStatus.OK).send(user)})
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}


export {create, index, login}