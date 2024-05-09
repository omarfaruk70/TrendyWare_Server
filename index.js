const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// built in middleWare

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.f3vnw1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // database collections
    const trendyWearDB = client.db("TrendyWear");
    const products = trendyWearDB.collection("products");
    const reviews = trendyWearDB.collection("reviews");


    
    // get all reviews to show the ui
    app.get("/api/v1/user/reviews", async (req, res) => {
      const getAllReviews = await reviews.find().toArray();
      res.send(getAllReviews);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("TrendyWear server is running");
});

app.listen(port, () => {
  console.log(`TrendyWear server is running on port ${port}`);
});
