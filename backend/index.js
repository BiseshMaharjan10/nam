const express = require("express");
const { connect } = require("./routes/userRoute");
const app = express();
const {sequelize, connectDB} = require("./database/database");
const cors = require("cors")
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/user", require('./routes/userRoute'));
app.use("/api/products", require('./routes/productRoute'));

// Home Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to  new the HomePage" });
});



const startServer = async () =>{
  await connectDB();
  await sequelize.sync({alter:true});
  app.listen(3000, () =>{
    console.log(`Srerver is running on port ${3000}`);
    console.log(`Server is running on port http://localhost:3000`);
  });
};
startServer();