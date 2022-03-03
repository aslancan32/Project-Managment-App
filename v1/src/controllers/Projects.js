import {insert, list, modify} from "../services/Projects.js";
import httpStatus from "http-status";

const index = (req,res)=> {
    console.log("Get Project"); 
    list()
        .then(response => res.status(httpStatus.OK).send(response))
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const create = (req,res)=> {
    console.log("Post Project"); 
    // console.log('req.user._doc :>> ', req.user);
    req.body.user_id = req.user._id
    insert(req.body)
        .then((response) => {
            res.status(httpStatus.CREATED).send(response)
            console.log(response.name + " created");
            }
        ).catch((e) => {
            console.log(e);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        }
    )
}

const update = (req,res) => {
    // console.log('req.prams.id :>> ', req.params.id);
    modify(req.params.id, req.body)
        .then(updatedProject => res.status(httpStatus.OK).send(updatedProject))
        .catch(err => res.status(httpStatus.BAD_REQUEST).send(err))
}

export {create, index, update}