let express=require('express');
let mongoose=require('mongoose');
const { enquiryRouter } = require('./App/routter/web/enquiryRouter');
let cors = require('cors');      
require('dotenv').config();
let app=express();

app.use(cors());
app.use(express.json());

app.use('/api/website',enquiryRouter)


mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('DB connected');
    app.listen(process.env.PORT || 3000,()=>{
console.log("sever is runing");
    })
}).catch((err)=>{console.log(err)});