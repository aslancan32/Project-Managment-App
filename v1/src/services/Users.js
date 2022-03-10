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

const modify = (where, data) => {
    //! Filter data that comes from req.body 
    // Object.keys(data).reduce((obj, key) => {
    //     if (key != "password") obj[key] = data[key]
    //     return obj
    // }, {})
    return User.findOneAndUpdate(where, data, {new: true})
}

const remove = (id) => { 
    return User.findByIdAndDelete(id)
}

export {insert, list, modify, loginUser, remove}