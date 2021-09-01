const mongoose= require ("mongoose");
const validator= require("validator");
const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");

//// UserSchema 
const userSchema = new mongoose.Schema ({

    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:5
    },
    email:{
        type:String,
        required:true,
        lowercase:true, 
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
        
    }, 
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})
//// Hash Password
userSchema.pre('save',async function(next){
    
    const user = this
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
});
userSchema.statics.findByCredentials = async(email,password) =>{
    const user = await User.findOne({email})
    

    if(!user){
        throw new Error("Unable to login. Please check email or password")
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Unable to login. Please check email or password')
    }

    return user
}




////////////////////// Create Token 
userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},"node-course")

   
    user.tokens = user.tokens.concat({token:token})
    await user.save()

    return token
}
/////////////// relation between user and thier todos
userSchema.virtual('todos',{
    ref:'Todo',   
    localField:'_id',
    foreignField:'owner'
})
///////////////////////

const User= mongoose.model("User", userSchema);
module.exports= User;