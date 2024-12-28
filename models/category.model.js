const mongoose=require("mongoose")

const categorySchema=mongoose.Schema({
    title:{
        type:String,
    },
    categoryImage:{
        type:String,
    },
},
{timestamps:true}
)

module.exports=mongoose.model("Category",categorySchema)