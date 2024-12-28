const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const SALT = 10;
const jwt = require("jsonwebtoken")
//Register Api
exports.store = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findedUser = await User.findOne({ email: email });
        if (findedUser) {
            return res.status(400).json({ status: 400, success: false, message: "Email already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, SALT)
        req.body.password = hashedPassword;
        const user = await User.create(req.body);
        return res.json({ status: 200, success: true, message: "User created successfully", user })
    }
    catch (err) {
        console.log(err)
    }
}
// Login Api
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findedUser = await User.findOne({ email: email });
        if (findedUser) {
            const isMatch = await bcrypt.compare(password, findedUser.password);
            if (isMatch) {
                const token = jwt.sign({ id: findedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json({ status: 200, success: true, message: "User logged in successfully", token })
            }
            else {
                return res.status(400).json({ status: 400, success: false, message: "Invalid credentials" })
            }

        }

        return res.json({ status: 200, success: true, message: "User created successfully", user })
    }
    catch (err) {
        console.log(err)
    }
}
exports.index = async (req, res) => {
    try {
        const users = await User.find()
        return res.json({ status: 200, success: true, message: "Users fetched successfully", users })
    }
    catch (err) {
        console.log(err)
    }
}
exports.get = async(req,res ) => {
try{
    const {id}=req.params;
    const user=await User.findOne({_id:id})
    if(!user){
        return res.status(404).json({status:404,success:false,message:"User not found"})
    }
    return res.json({status:200,success:true,message:"User fetched successfully",user})

}
catch(err){
    console.log(err)
}
}
exports.destroy = async(req,res) => {
    const {id}=req.params;
    const user=await User.findOneAndDelete({_id:id})
    if(!user){
        return res.status(404).json({status:404,success:false,message:"User not found"})
    }
    return res.json({status:200,success:true,message:"User deleted successfully"})
}

exports.update = async(req,res) => {
try{
    const {id}=req.params;
    const updatedUser=await User.findByIdAndUpdate(id,req.body,{new:true})
    if(!updatedUser){
        return res.status(404).json({status:404,success:false,message:"User not found"})
    }
    return res.json({status:200,success:true,message:"User updated successfully",user:updatedUser})
}
catch(err){
    console.log(err);
    
}
}

// To genereate OTP
exports.generateOTP=async(req,res)=>{
    try{
const {email}=req.body;
    const findedUser=await User.findOne({email:email});
    if(!findedUser){
        return res.status(404).json({status:404,success:false,message:"User not found"})
    }
    const otp=Math.floor(100000 + Math.random() * 900000);
    findedUser.otp=otp;
    await findedUser.save();
    return res.json({status:200,success:true,message:"OTP generated Successfully!",otp})
    }
    catch(err){
        console.log(err)
    }
}

exports.verifyOTP=async(req,res)=>{
    try{
        const {email,otp}=req.body;
        const findedUser=await User.findOne({email:email});
        if(!findedUser){
            return res.status(404).json({status:404,success:false,message:"User not found"})
        }
        if(findedUser.otp!=otp){
            return res.status(400).json({status:400,success:false,message:"Invalid OTP"})
        }
        findedUser.otp=null;
        findedUser.save();
        return res.json({status:200,success:true,message:"Email verified successfully!"})

    }
    catch(err){
        console.log(err)
    }
}


exports.updatePassword=async(req,res)=>{
    try{
const {email,password}=req.body;
    const findedUser=await User.findOne({email:email});
    if(!findedUser){
        return res.status(404).json({status:404,success:false,message:"User not found"})
    }
    const hashedPassword=await bcrypt.hash(password, SALT)
    findedUser.password=hashedPassword;
    await findedUser.save();
    return res.json({status:200,success:true,message:"Password updated successfully!",user:findedUser})
    }
    catch(err){
        console.log(err)
    }
}