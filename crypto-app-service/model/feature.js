const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featureSchema = new Schema({

   region: {
       type : String,
       unique: 1
    },
    prefer_feature: {
        type: Array
    },
    prefer_feature_value: {
        type: Array
    },
    attention_feature: {
        type: String
    }
},{
    collection : 'features'
},{timestamps: true});

const Features = mongoose.model('Features', featureSchema);
module.exports = Features;
