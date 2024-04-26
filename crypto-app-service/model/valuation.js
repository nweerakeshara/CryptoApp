const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const valuationSchema = new Schema({

   label : {
        type : String
    },
    username : {
        type : String
    },
    coordinates: {
        type : Object
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
    date: {
        type: Date,
        default: Date.now()
    },
},{
    collection : 'valuations'
},{timestamps: true});

const Valuation = mongoose.model('Valuations', valuationSchema);
module.exports = Valuation;
