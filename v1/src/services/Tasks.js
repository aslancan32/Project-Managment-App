import BaseService from "./BaseService.js";
import Model from "../models/Tasks.js"
class Tasks extends BaseService {
    constructor(){
        super(Model)
    }
    findOne(where, populate) {
        if (!populate) return Model.findOne(where)
        return Model.findOne(where).populate([{
            path:"user_id",
            select: "full_name email profile_image"
            },
            {
            path: "sub_tasks",
            select:"title description is_complated assigned_to sub_tasks"
            },
            {
            path: "comments",
            populate: {
                path:"user_id",
                select: "full_name email profile_image"
            }
            },
            {
            path: "assigned_to",
            select: "full_name email profile_image"
            }
        ])
    }
}
export default new Tasks()