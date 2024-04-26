const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({

   title : {
        type : String
    },
    username : {
        type : String
    },
    propertyType: {
        type: String
    },
    region: {
        type : String
    },
    sizeType: {
        type: String
    },
    size: {
        type : Number
    },
    addr: {
        type : String,
        unique: 1,
        required: true
    },
    des: {
        type : String
    },
    coordinates: {
        type : Object
    },
    price: {
        type : Number
    },
    contactNum: {
        type : Number
    },
    starGrade: {
        type : Number
    },
    valuation: {
        type : Boolean
    },
    attraction: {
        type : Object
    },
    accessibility: {
        type : Object
    },
    competition: {
        type : Object
    },
    demand: {
        type : Object
    },
    demandGraph: {
        type : Object
    },
    files: [Object],
    date: {
        type: Date,
        default: Date.now()
    },
},{
    collection : 'properties'
},{timestamps: true});

const Property = mongoose.model('Properties', propertySchema);
module.exports = Property;
