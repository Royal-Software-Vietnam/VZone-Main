import mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    name:{ type:String, required:[true, "Name is required"], trim:true, text:true },
    username:{ type:String, required:[true, "Username is required"], trim:true, text:true, unique:true },
    email:{ type:String, required:[true, "Email is required"], trim:true, text:true },
    password:{ type:String, required:[true, "Password is required"] },
    cover:{ type:String, default:"https://picsum.photos/400", text:true },
    avatar:{ type:String, trim:true },
    gender:{ type:String },
    birthday:{ type:Date },
    verified:{ type:Boolean, default:false },
    friends:{ type:Array, default:[] },
    following:{ type:Array, default:[] },
    followers:{ type:Array, default:[] },
    requests: { type:Array, default:[] },
    search:[{
        user:{ type:ObjectId, ref:'User' }
    }],
    details:{
        job:String,
        hometown:String,
        school:String
    },
    savedPosts:[{
        post:{ type:ObjectId, ref:"Post" },
        savedAt:{ type:Date, default:new Date() }
    }]
}, { timestamps:true })

export default mongoose.model('User', UserSchema)