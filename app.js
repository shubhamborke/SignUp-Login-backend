const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const uri =
  "mongodb+srv://ShubhamBorke:shubhamsj@firstcluster.ezspt.mongodb.net/intern?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());

app.get("/signup", (req, res) => {
  res.send("hello");
});

app.post("/signup", cors(), async (req, res) => {
  const result = await req.body;
  const { name, email, mobile, age, dateOfBirth } = result;
  try {
    await client.connect();
    const checkExist = await client.db("intern").collection("intern").findOne({
      name: name,
      email: email,
      mobile: mobile,
      age: age,
      dateOfBirth: dateOfBirth,
    });
    if (checkExist === null) {
      await client.db("intern").collection("intern").insertOne(result);
      res.send("created");
    } else {
      res.send("exist");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", cors(), async (req, res) => {
  const result = await req.body;
  console.log(result);
  await client.connect();
  const dataCollection = await client.db("intern").collection("intern").findOne({name: result.username, password: result.password})
  if(dataCollection !== null){
      res.send(dataCollection)
  }else{
      res.send("wrong")
  }
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Listing on port " + port)
});
