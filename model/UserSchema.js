import mongoose from 'mongoose'

const UserSchema=new mongoose.Schema({
    fullName:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    activeState:{type:Boolean,require:true},
});
export default  mongoose.model('user',UserSchema);