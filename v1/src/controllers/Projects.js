import insert from "../services/Projects.js";
import httpStatus from "http-status";

const index = (req,res)=> {
    console.log("project"); 
    res.send("Project Routes Get")
}

const projects = (req,res)=> {
    console.log("Post Project Routes"); 

    insert({id:1, name:"Mucahit"}).then((response) => {
        res.status(httpStatus.CREATED).send(response)
        }
    ).catch((e) => {
        console.log(e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)

    }
    )

}


export {projects, index}