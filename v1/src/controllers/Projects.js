import httpStatus from "http-status";
import ProjectServices from "../services/Projects.js";

class Project {
    index (req,res) {
        console.log("Get Project"); 
        ProjectServices.list()
            .then(response => res.status(httpStatus.OK).send(response))
            .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
    }
    
    create (req,res) {
        console.log("Post Project"); 
        // console.log('req.user._doc :>> ', req.user);
        req.body.user_id = req.user._id
        ProjectServices.create(req.body)
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
    
    update (req,res)  {
        // console.log('req.prams.id :>> ', req.params.id);
        ProjectServices.update(req.params.id, req.body)
            .then(updatedProject => res.status(httpStatus.OK).send(updatedProject))
            .catch(err => res.status(httpStatus.BAD_REQUEST).send(err))
    }
    deleteProject (req, res)  {
        if(!req.params?.id.match(/^[0-9a-fA-F]{24}$/)) return res.status(httpStatus.BAD_REQUEST).send({message: "ID is not correct"})
        ProjectServices.delete(req.params?.id)
            .then((deletedProject) => {
                console.log('deletedProject :>> ', deletedProject);
                if(!deletedProject ) {
                    return res.status(httpStatus.NOT_FOUND).send({message: "Project not found"})
                }
                res.status(httpStatus.OK).send(deletedProject)
    
            }).catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: "An error occurred in save progres",err}))
            
    }
}


export default new Project()