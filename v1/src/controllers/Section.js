import httpStatus from "http-status";
import SectionServices from "../services/Section.js";

class Section{
    index (req,res) {
        console.log("Get Sections"); 
        SectionServices.list()
            .then(response => res.status(httpStatus.OK).send(response))
            .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
    }
    
    create (req,res) {
        console.log("Post Sections"); 
        // console.log('req.user._doc :>> ', req.user);
        req.body.user_id = req.user._id
        SectionServices.create(req.body)
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
    
    update (req,res) {
        if(!req.params?.sectionId.match(/^[0-9a-fA-F]{24}$/)) return res.status(httpStatus.BAD_REQUEST).send({message: "ID is not correct"})
        //! Check Id isExist
        SectionServices.update(req.params.sectionId, req.body)
            .then((updatedDoc) => {
                if(!updatedDoc) return res.status(httpStatus.NOT_FOUND).send({message: "Section not found"})
                res.status(httpStatus.OK).send(updatedDoc)})
            .catch(err => res.status(httpStatus.BAD_REQUEST).send(err))
    }
    deleteSection (req, res)  {
        if(!req.params?.sectionId.match(/^[0-9a-fA-F]{24}$/)) return res.status(httpStatus.BAD_REQUEST).send({message: "ID is not correct"})
        //! Check Id isExist
        console.log(req.params.sectionId);
        SectionServices.delete(req.params?.sectionId)
            .then((deletedProject) => {
                console.log('deletedProject :>> ', deletedProject);
                if(!deletedProject ) {
                    return res.status(httpStatus.NOT_FOUND).send({message: "Section not found"})
                }
                res.status(httpStatus.OK).send(deletedProject)
    
            }).catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: "An error occurred in delete progres",err}))
            
    }
}

export default new Section()