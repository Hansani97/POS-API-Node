import OrderSchema from "../model/OrderSchema.js";

const create = (req,resp)=>{
    const order = new OrderSchema({
        date:req.body.date,
        customerDetails:req.body.customerDetails,
        totalCost:req.body.totalCost,
        products:req.body.products
    })
    order.save().then((response)=>{
        return resp.status(201).json({'message':'order saved'})
    }).catch(err=>{
        return resp.status(500).json(err)
    })
}
const findById = (req,resp)=>{
    OrderSchema.findOne({'id':req.params.id}).then(selectedobj=>{
        if (selectedobj!=null){
            return resp.status(200).json({'message':selectedobj});
        }else {
            return resp.status(500).json({'message':'Order not found'});
        }
    });
}
const findAll = (req,resp)=>{
    try {
        const {searchText, page = 1, size = 10} = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText){
            query.$text={$search:searchText}
        }

        const skip = (pageNumber-1)*pageSize;
        const data = OrderSchema.find(query)
            .limit(pageSize)
            .skip(skip);
        return resp.status(200).json(data);
    } catch (error) {
        return resp.status(500).json({'error':'Internal server error'});
    }
}
const update = async (req,resp)=>{
    const updateData = await OrderSchema.findOneAndUpdate({'id':req.params.id},{
        $set:{
            date:req.body.date,
            customerDetails:req.body.customerDetails,
            totalCost:req.body.totalCost,
            products:req.body.products,
        }
    },{new:true});
    if (updateData){
        return resp.status(200).json({'message':'Updated'})
    }else {
        return resp.status(500).json({'message':'Internal server error'})
    }

}
const deleteById = async (req,resp)=>{
    const deleteData = await OrderSchema.findByIdAndDelete({'id':req.params.id})

    if (deleteData){
        return resp.status(204).json({'message':'Deleted'})
    }else {
        return resp.status(500).json({'message':'Internal server error'})
    }
}
const findCount=(req,resp)=>{
    try{
        OrderSchema.countDocuments().then(data=>{
            return resp.status(200).json(data);
        })

    }catch (error){
        return resp.status(500).json({'message':'internal server error'});
    }
}

const findAllIncome=async (req,resp)=>{
    try{
        const result = await OrderSchema.aggregate([
            {$group:{
                    _id:null,
                    totalCostSum:{$sum:'$totalCost'}
                }}
        ]);
        const totalCostSum= result.length>0?result[0].totalCostSum:0;
        return resp.json(totalCostSum);
    }catch (error){
        return resp.status(500).json({'message':'internal server error'});
    }
}

export default {
    create,
    findById,
    findAll,
    update,
    deleteById,
    findCount,
    findAllIncome
}