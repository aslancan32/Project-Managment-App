import BaseService from "./BaseService.js";
import Model from "../models/Projects.js"
class Project extends BaseService {
    constructor(){
        super(Model)
    }
    
    list(where) {
        return Model?.find( {} || where ).populate({
            path:"user_id",
            select: "full_name email profile_image"
        });
    }
}
export default new Project()