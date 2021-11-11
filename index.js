const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  //--------------Insert multiple recipes---------------------------------------
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // return Recipe.create(data[0]);
    return Recipe.insertMany(data);
  })
  //Update recipe
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  //----------------------Remove a recipe---------------------------------------
  .then(() => {
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  //---------------------Close the data base---------------------------------------
  .then((data) => {
    console.log(`Database Updated ${data}`);
    mongoose.connection.close();
  })
  .then(() => {
    console.log("connection is closed");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
