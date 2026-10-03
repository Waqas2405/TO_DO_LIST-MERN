let express=require('express');
let mongoose=require('mongoose');
const { enquiryRouter } = require('./App/routter/web/enquiryRouter');
let cors = require('cors');      
require('dotenv').config();
let app=express();

app.use(cors());
app.use(express.json());

app.use('/api/website',enquiryRouter)


let connPromise = null;
async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  if (!connPromise) {
    connPromise = mongoose
      .connect(process.env.DB_URL, { serverSelectionTimeoutMS: 8000 })
      .catch((err) => { connPromise = null; throw err; });
  }
  await connPromise;
}

app.use(async (req, res, next) => {
  try { await connectDB(); next(); }
  catch (err) { res.status(500).json({ status: 0, error: err.message }); }
});

if (require.main === module) {
  app.listen(process.env.PORT || 5000, () => console.log("server is running"));
}

module.exports = app;
