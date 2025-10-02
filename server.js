const express = require('express');
const connectDb = require('./bd');
const View = require('./view')
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/view', async (req, res) => {
  try {
    const updatedView = await View.findOneAndUpdate(
      {},  
      { $inc: { view: 1 } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Hi There", views: updatedView.view });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/get-views', async (req, res) => {
  try {
    const viewData = await View.findOne({});
    res.status(200).json({message : "success",  views: viewData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;

connectDb()
    .then(() => {
        app.listen(PORT, () => console.log("Server started on 5000"));
        console.log("Database connected");
    })
    .catch(() => {
        console.log("Database not connected")
    })