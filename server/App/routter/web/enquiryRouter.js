let express=require('express');
const { inquiryinsert ,inquirview,inquirdelet,inquirupdate,inquirupdaterow} = require('../../Controller/web/inquiryController');
let enquiryRouter= express.Router();

enquiryRouter.post("/insert",inquiryinsert);
enquiryRouter.get("/veiw",inquirview);
enquiryRouter.delete("/delete/:id",inquirdelet);
enquiryRouter.get("/update/:id",inquirupdate);
enquiryRouter.put("/updaterow/:id",inquirupdaterow);
module.exports={enquiryRouter};