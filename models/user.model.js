const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is needed "]
    },
    username: {
        type: String,
        required: [true, "Username is needed "]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email id!`
        }
    },
            password: {
                type: String,
                required: true
            },
            profilePicture: {
                type: String
            },
            profileBio: {
                type: String
            },
            gender: {
                type: String
            },
            website: {
                type: String
            }
})

const User = mongoose.model("User", UserSchema);

module.exports = {
    User
};