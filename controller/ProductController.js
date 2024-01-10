import ProductSchema from "../model/ProductSchema.js";

const create = (req, resp) => {
    const product = new ProductSchema({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        unitPrice: req.body.unitPrice,
        qtyOnHand: req.body.qtyOnHand
    })
    product.save().then((response) => {
        return resp.status(201).json({'message': 'product saved'})
    }).catch(err => {
        return resp.status(500).json(err)
    })
}
const findById = (req, resp) => {
    ProductSchema.findOne({'_id': req.params.id}).then(selectedObj => {
        if (selectedObj != null) {
            return resp.status(200).json(selectedObj);
        } else {
            return resp.status(500).json({'message': 'Product not found'});
        }
    });
}
const findAll = (req, resp) => {
    try {
        const {searchText, page = 1, size = 10} = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText) {
            query.$text = {$search: searchText}
        }

        const skip = (pageNumber - 1) * pageSize;
        ProductSchema.find(query)
            .limit(pageSize)
            .skip(skip).then(data => {
            return resp.status(200).json(data);
        })

    } catch (error) {
        return resp.status(500).json({'error': 'Internal server error'});
    }
}

const update = async (req, resp) => {
    const updateData = await ProductSchema.findOneAndUpdate({'_id':req.params.id}, {
        $set: {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            unitPrice: req.body.unitPrice,
            qtyOnHand: req.body.qtyOnHand
        }
    }, {new: true});
    if (updateData) {
        return resp.status(200).json({'message': 'Updated'})
    } else {
        return resp.status(500).json({'message': 'Internal server error'})
    }
}
const deleteById = async (req, resp) => {
    const deleteData = await ProductSchema.findByIdAndDelete({'_id': req.params.id})

    if (deleteData) {
        return resp.status(204).json({'message': 'Deleted'})
    } else {
        return resp.status(500).json({'message': 'Internal server error'})
    }
}

const findAllMin = (req,resp)=>{
    try {
        ProductSchema.find({qtyOnHand: {$lt:10}}).then(data => {
            return resp.status(200).json(data);
        })

    } catch (error) {
        return resp.status(500).json({'error': 'Internal server error'});
    }
}

const findCount=(req,resp)=>{
    try{
        ProductSchema.countDocuments().then(data=>{
            return resp.status(200).json(data);
        })

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
    findAllMin
}