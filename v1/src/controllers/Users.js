import httpStatus from "http-status";
import { v4 as uuidv4 } from "uuid";
import {insert, list, loginUser, modify, remove} from "../services/Users.js";
import * as projectServices from "../services/Projects.js";
import {generateAccessToken, generateRefreshToken, passwordToHash} from "../scripts/utils/helper.js";
import eventEmiter from "../scripts/events/eventEmiter.js";
import path from "path"
import { fileURLToPath } from "url";

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

const updateInfo = (req,res) => {
    // console.log('req.user :>> ', req.user._id);
    modify({_id: req.user._id}, req.body)
        .then(updatedUser => {
            res.status(httpStatus.OK).send(updatedUser)
        })
        .catch((err) => res.status(INTERNAL_SERVER_ERROR).send(err))
}
const changePassword = (req,res) => {
    modify({_id: req.user._id}, {password: passwordToHash(req.body.password)})
    .then(updatedUser => {
        res.status(httpStatus.OK).send(updatedUser)
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send(err))
}

const deleteUser = (req, res) => {
    if(!req.params?.id.match(/^[0-9a-fA-F]{24}$/)) return res.status(httpStatus.BAD_REQUEST).send({message: "ID is not correct"})
    remove(req.params?.id)
        .then((deletedUser) => {
            console.log('deletedUSer :>> ', deletedUser);
            if(!deletedUser ) {
                return res.status(httpStatus.NOT_FOUND).send({message: "User not found"})
            }
            res.status(httpStatus.OK).send(deletedUser)

        }).catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: "An error occurred in save progres",err}))
        
}

const updateProfileImage = (req, res) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const fileName = req.user._id + path.extname(req.files.profile_image.name)
    const folderPath = path.join(__dirname, "../", "uploads/users",fileName )
    if (!req?.files?.profile_image) { return res.status(httpStatus.BAD_REQUEST).send({error : "Lutfen bir profil fotografi seciniz."})}
    req.files.profile_image.mv(folderPath, (err) => {
        if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({err: err})

        modify({_id: req.user._id}, {profile_image: fileName}).then((updatedUser) => {
            res.status(httpStatus.OK).send({message : updatedUser})
        }).catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Fotograf basariyla yuklendi, Fakat kayit isleminde bir sorun olustu."}))
    })
}
export {create, index, login, projectList, resetPassword, updateInfo, deleteUser, changePassword, updateProfileImage}
