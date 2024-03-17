import mongoose, {Schema} from "mongoose";


const userSchema = new Schema({
    username : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    member : {
        type : Boolean,
        require : true
    },
    admin : {
        type : Boolean,
        require : true
    },
    memberCode : {
        type : String,
        require : true
    }
})


const User = mongoose.model("User", userSchema);

export default User;