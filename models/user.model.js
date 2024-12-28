const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        default:null
    }
},
{timestamps:true}
)

module.exports=mongoose.model("User",userSchema)