import mongoose, {Schema} from "mongoose";



const postSchema = new Schema({
    author : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    createdOn : {
        type : Date,
        require: Date.now
    }
})

const Post = mongoose.model("Post", postSchema);

export default Post;