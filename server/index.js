let express=require('express');
let mongoose=require('mongoose');
const { enquiryRouter } = require('./App/routter/web/enquiryRouter');
let cors = require('cors');      
require('dotenv').config();
let app=express();

app.use(cors());
app.use(express.json());

app.use('/api/website',enquiryRouter)


let dbError = null;
mongoose.connect(process.env.DB_URL, { serverSelectionTimeoutMS: 8000 })
  .then(() => console.log('DB connected'))
  .catch((err) => { dbError = err.message; console.log(err); });

app.get('/test-db', (req, res) => {
  res.send({ hasUrl: !!process.env.DB_URL, state: mongoose.connection.readyState, dbError });
});

if (require.main === module) {
  app.listen(process.env.PORT || 5000, () => console.log("server is running"));
}

module.exports = app;
