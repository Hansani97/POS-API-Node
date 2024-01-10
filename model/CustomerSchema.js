import mongoose from 'mongoose'

const CustomerSchema=new mongoose.Schema({
    name:{type:String,require:true},
    address:{type:String,require:true},
    salary:{type:Number,require:true},
});
export default  mongoose.model('customer',CustomerSchema);