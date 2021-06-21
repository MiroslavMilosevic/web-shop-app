const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NewPhoneSchema = new Schema
({
model :{
    type:String,
    required:true
},
marka:{
    type:String,
    required:true
},
procesor:{
    type:String,
    required:true
},
baterija:{
    type:String,
    required:true
},
kamera:{
    type:String,
    required:true
},
memorija:{
    type:String,
    required:true
},
softver:{
    type:String,
    required:true
},
cena:{
    type:Number,
    required:true
},
naslov:{
    type:String,
    required:true
},
slika:{
    type:String,
    required:false
},
komentari:{
    type:[String],
    required:false
},

},{timestamps:true});

const Phone = mongoose.model('Phone', NewPhoneSchema );

module.exports = Phone;