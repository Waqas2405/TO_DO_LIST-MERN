let mongoose=require('mongoose');

let Schema=mongoose.Schema;

let enquiresschema= new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  phone:{
    type:String,
    required:true
  },
  message:{
    type:String,
    required:true
  },
});
let enquiremodel=mongoose.model("Enquires",enquiresschema);
module.exports=enquiremodel;