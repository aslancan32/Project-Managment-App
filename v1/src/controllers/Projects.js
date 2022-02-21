import {insert, list} from "../services/Projects.js";
import httpStatus from "http-status";

const index = (req,res)=> {
    console.log("Get Project"); 
    list()
        .then(response => res.status(httpStatus.OK).send(response))
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const create = (req,res)=> {
    console.log("Post Project"); 

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


export {create, index}