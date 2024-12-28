const Category = require("../models/category.model")
//Create Category Api
exports.store = async (req, res) => {
    try {
        req.body.categoryImage=req.file.filename;
        const category = await Category.create(req.body);
        return res.json({ status: 200, success: true, message: "Category created successfully", category })
    }
    catch (err) {
        console.log(err)
    }
}
exports.index = async (req, res) => {
    try {
        const categories = await Category.find()
        return res.json({ status: 200, success: true, message: "Categories fetched successfully", categories })
    }
    catch (err) {
        console.log(err)
    }
}
exports.get = async(req,res ) => {
try{
    const {id}=req.params;
    const category=await Category.findOne({_id:id})
    if(!category){
        return res.status(404).json({status:404,success:false,message:"category not found"})
    }
    return res.json({status:200,success:true,message:"category fetched successfully",category})

}
catch(err){
    console.log(err)
}
}
exports.destroy = async(req,res) => {
    const {id}=req.params;
    const category=await Category.findOneAndDelete({_id:id})
    if(!category){
        return res.status(404).json({status:404,success:false,message:"Category not found"})
    }
    return res.json({status:200,success:true,message:"Category deleted successfully"})
}

exports.update = async(req,res) => {
try{
    const {id}=req.params;
    const updatedCategory=await Category.findByIdAndUpdate(id,req.body,{new:true})
    if(!updatedCategory){
        return res.status(404).json({status:404,success:false,message:"Category not found"})
    }
    return res.json({status:200,success:true,message:"Category updated successfully",user:updatedCategory})
}
catch(err){
    console.log(err);
}
}