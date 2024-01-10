import mongoose from 'mongoose'

const ProductSchema=new mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    image:{type:String,require:true},
    unitPrice:{type:Number,require:true},
    qtyOnHand:{type:Number,require:true},
});
export default  mongoose.model('product',ProductSchema);