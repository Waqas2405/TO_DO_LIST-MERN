const enquiremodel = require("../../models/enquires");

let inquiryinsert=(req,res)=>{
 

let{name,email,phone,message}=req.body;
let enquiry=new enquiremodel({
  name,
  email,
  phone,
  message,
});
enquiry.save().then(()=>{
    res.send({status:1, message:"Enquire Save"});
}).catch((err)=>{
    res.send({status:0, message:"Enquire  not Save", error:err.message});
})


};

let inquirview=async(req,res)=>{
 
    let veiw= await enquiremodel.find();
    res.send({status:1, enquireList:veiw});
};
let inquirdelet=async(req,res)=>{
    let id=req.params.id;
    let veiw= await enquiremodel.deleteOne({_id:id});
    res.send({status:1, message:"data is deleted succesfully", veiw});
};
let inquirupdate=async(req,res)=>{
    let id=req.params.id;
    let veiw= await enquiremodel.findOne({_id:id});
    res.send({status:1,veiw});
};

let inquirupdaterow = async (req, res) => {
  console.log("update hit", req.params.id, req.body);
  try {
    let id = req.params.id;
    let { name, email, phone, message } = req.body;
    let result = await enquiremodel.updateOne({ _id: id }, { name, email, phone, message });
    res.send({ status: 1, message: "update Successfull", result });
  } catch (err) {
    res.status(500).send({ status: 0, message: "update failed", error: err.message });
  }
};
module.exports={inquiryinsert,inquirview,inquirdelet,inquirupdate,inquirupdaterow}