import httpStatus from "http-status";
import { v4 as uuidv4 } from "uuid";
import {insert, list, loginUser, modify} from "../services/Users.js";
import * as projectServices from "../services/Projects.js";
import {generateAccessToken, generateRefreshToken, passwordToHash} from "../scripts/utils/helper.js";
import eventEmiter from "../scripts/events/eventEmiter.js";

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

const projectList = (req, res) => {
    // console.log('req.user.id :>> ', req.user._id);
    projectServices.list({user_id: req?.user?._id})
        .then(userProject =>  res.status(httpStatus.OK).send(userProject))
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error:"beklenmedik bir hata olustu"}))
}

const resetPassword = (req, res) => {
    const newPass = uuidv4().split("-")[0]
    modify({email:req.body.email}, {password: passwordToHash(newPass)}) 
        .then((updatedUser) => {
            if(!updatedUser) return res.status(httpStatus.NOT_FOUND).send({error: "User not found."})
            eventEmiter.emit('send_email', {
                to: updatedUser.email, // list of receivers
                subject: "Yeni Sifreniz ✔", // Subject line
                html: `Yeni Sifreniz: <b> ${newPass}</b> <br /> Lutfen sifrenizi degistimeyi unutmayiniz.`, // html body
            })
            res.status(httpStatus.OK).send({message: 'Sifreniz mail adresinize yonlendirilmistir.'})
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Sifre sifirlama sirasinda bir hata olustu"}))
}

const updateUserInfo = (req,res) => {
    // console.log('req.user :>> ', req.user._id);
    modify({_id: req.user._id}, req.body)
        .then(updatedUser => {
            res.status(httpStatus.OK).send(updatedUser)
        })
        .catch((err) => res.status(INTERNAL_SERVER_ERROR).send(err))
}

export {create, index, login, projectList, resetPassword,updateUserInfo}