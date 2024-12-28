const Product = require("../models/product.model")
//Create Product Api
exports.store = async (req, res) => {
    try {
        req.body.image=req.file.filename;
        const product = await Product.create(req.body);
        return res.json({ status: 200, success: true, message: "Product created successfully", product })
    }
    catch (err) {
        console.log(err)
    }
}
exports.index = async (req, res) => {
    try {
        const products = await Product.find().populate("category"); // Use find() with populate
        return res.json({
            status: 200,
            success: true,
            message: "Products fetched successfully",
            products,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: "An error occurred while fetching products",
            error: err.message,
        });
    }
};

exports.get = async(req,res ) => {
try{
    const {id}=req.params;
    const product=await Product.findOne({_id:id})
    if(!product){
        return res.status(404).json({status:404,success:false,message:"Product not found"})
    }
    return res.json({status:200,success:true,message:"Product fetched successfully",product})

}
catch(err){
    console.log(err)
}
}
exports.destroy = async(req,res) => {
    const {id}=req.params;
    const product=await Product.findOneAndDelete({_id:id})
    if(!product){
        return res.status(404).json({status:404,success:false,message:"Product not found"})
    }
    return res.json({status:200,success:true,message:"Product deleted successfully"})
}

exports.update = async(req,res) => {
try{
    const {id}=req.params;
    const updatedProduct=await Product.findByIdAndUpdate(id,req.body,{new:true})
    if(!updatedProduct){
        return res.status(404).json({status:404,success:false,message:"Product not found"})
    }
    return res.json({status:200,success:true,message:"Product updated successfully",user:updatedProduct})
}
catch(err){
    console.log(err);
    
}
}