// import {findOne, insert, list, modify, remove} from "../services/Tasks.js";
import httpStatus from "http-status";
import TaskServices from "../services/Tasks.js";

class Task {
    showTask (req,res) {
        if(!req.params?.taskId.match(/^[0-9a-fA-F]{24}$/)) return res.status(httpStatus.BAD_REQUEST).send({message: "ID is not correct"})
        console.log("Get Tasks"); 
        TaskServices.findOne({_id: req.params.taskId}, true)
            .then(response => res.status(httpStatus.OK).send(response))
            .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
    }
    
    create (req,res) {
        console.log("Post Tasks"); 
        // console.log('req.user._doc :>> ', req.user);
        req.body.user_id = req.user._id
        TaskServices.create(req.body)
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
        if(!req.params?.taskId.match(/^[0-9a-fA-F]{24}$/)) return res.status(httpStatus.BAD_REQUEST).send({message: "ID is not correct"})
        //! Check Id isExist
        TaskServices.update(req.params.taskId, req.body)
            .then((updatedDoc) => {
                if(!updatedDoc) return res.status(httpStatus.NOT_FOUND).send({message: "Section not found"})
                res.status(httpStatus.OK).send(updatedDoc)})
            .catch(err => res.status(httpStatus.BAD_REQUEST).send(err))
    }
    deleteSection (req, res)  {
        // if(!req.params?.taskId.match(/^[0-9a-fA-F]{24}$/)) return res.status(httpStatus.BAD_REQUEST).send({message: "ID is not correct"})
        // //! Check Id isExist
        // console.log(req.params.taskId);
        // remove(req.params?.taskId)
        //     .then((deletedProject) => {
        //         console.log('deletedProject :>> ', deletedProject);
        //         if(!deletedProject ) {
        //             return res.status(httpStatus.NOT_FOUND).send({message: "Section not found"})
        //         }
        //         res.status(httpStatus.OK).send(deletedProject)
    
        //     }).catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: "An error occurred in delete progres",err}))
            
    }
    
    addComment (req,res)  {
        req.body.user_id = req.user._id  
        req.body.commented_at = new Date()
    
        TaskServices.findOne({_id: req.params.taskId}).then((matchedObject) => {
    
            if(!matchedObject) return res.status(httpStatus.NOT_FOUND).send({message: "Task not found"})
            matchedObject.comments.push(req.body)
            matchedObject.save().
            then((updatedDoc) => {
                res.status(httpStatus.OK).send(updatedDoc)
            }).catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: "An error occurred in add comment progres",err}))
    
        }).catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: "An error occurred getting the task",err}))
        
    }
    
    addSubTask (req,res)  {
        req.body.user_id = req.user._id
        if(!req.params.taskId) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error:"Task Id bilgisi eksiktir."})
    
        TaskServices.create(req.body)
            .then((response) => {
                TaskServices.findOne({_id: req.params.taskId}).then(matchedObject => {
                    matchedObject.sub_tasks.push(response._id)
                    matchedObject.save()
                        .then((updatedDoc) => res.status(httpStatus.CREATED).send(updatedDoc))
                        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
                        )
                })
            }).catch((e) => {
                console.log(e);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
            }
        )
    }
}


export default new Task()