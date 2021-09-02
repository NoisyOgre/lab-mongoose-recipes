const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
async function connect() {
  await mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false,
  });
  console.log("Connected to the database");
  await Recipe.deleteMany();
  updateDatabase();
}
async function updateDatabase() {
  try {
    const createdRecipe = await Recipe.create({
      title: "Brigadeiro",
      level: "Easy Peasy",
      ingredients: ["condensed milk", "powdered chocolate"],
      cuisine: "Brazilin",
      dishType: "dessert",
      duration: "25",
      creator: "unknown",
    });
    await Recipe.insertMany(data);
    data.forEach((element) => {
      console.log(element.title);
    });
    await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 });
    await Recipe.deleteOne ({title:"Carrot Cake"})
  } catch (e) {
    console.log("Error connecting to the database", e);
  }
   finally {
    mongoose.connection.close();
  }
}
connect();
