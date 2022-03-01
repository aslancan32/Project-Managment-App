import User from "../models/Users.js";

const insert = (data) => {
    const user = new User(data);
    return user.save()
}
const list = () => {
    return User.find({});
}

const loginUser = (loginData) => {
    return User.findOne(loginData)
}
export {insert, list, loginUser}