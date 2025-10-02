const express = require('express');
const connectDb = require('./bd');
const View = require('./view')

const app = express();

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


connectDb()
    .then(() => {
        app.listen(5000, () => console.log("Server started on 5000"));
        console.log("Database connected");
    })
    .catch(() => {
        console.log("Database not connected")
    })