import BaseService from "./BaseService.js";
import Model from "../models/Users.js"
class User extends BaseService {
    constructor(){
        super(Model)
    }
}
export default new User()