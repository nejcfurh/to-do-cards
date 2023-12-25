'use strict';

// modules

const username = require(__dirname + "/auth.js").username;
const password = require(__dirname + "/auth.js").password;

// console.log(password, username);

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js'); // our own module
const mongoose = require('mongoose');
const _ = require('lodash');

const day = date.getDate();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

main().catch(err => console.log(err));

async function main() {
  mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.06chanb.mongodb.net/ToDoListDB`, {useNewUrlParser: true});
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Successfully connected to MongoDB');
});

// ITEMS SCHEMA

const itemsSchema = {
  name: {
    required: true,
    type: String
  }
};

const Item = mongoose.model('item', itemsSchema);

const item1 = new Item({
  name: "Welcome to your To-Do List App!"
});
const item2 = new Item({
  name: "Hit the + button to add a new item!"
});
const item3 = new Item({
  name: "Mark check button to delete an item!"
});

const defaultItems = [item1, item2, item3];

// LIST SCHEMA

const listSchema = {
  name: {
    required: true,
    type: String
  },
  url: {
    required: true,
    type: String
  },
  body: {
    required: false,
    type: String
  },
  items: {
    type: [itemsSchema]
  }
};

const List = mongoose.model('list', listSchema);

// const list1 = new List({
//   name: "Ongoing",
//   url: `../photos/image1.jpg`,
//   body: "Chicago skyline is one of the best in the world!",
//   items: [item1, item2, item3]
// })

// const list2 = new List({
//   name: "Home",
//   url: `../photos/image2.jpg`,
//   body: "Calling a house home is fulfiling!",
//   items: [item1, item2]
// })

// const list3 = new List({
//   name: "School",
//   url: `../photos/image3.jpg`,
//   body: "Going to school is the best time you will ever have!",
//   items: [item2, item3]
// })

// const defaultLists = [list1, list2, list3];

// Save initial array of lists to DB!

// defaultLists.map((list) => {
//   db.collection('lists').insertOne(list, (err, result) => {
//     if (err) return console.log(err)
//     console.log('Saved to database!')
//   })
// });

// RENDERING THE LIST OF CARDS from DB

app.get("/", function(req, res) {
  List.find({})
    .then(lists => 
      {
        if(lists.length === 0) {
          List.insertMany(defaultLists)
          .then(function() {
            console.log("Filled lists with defaultLists");
          })
          .catch(function(err) {
            console.log(err);
          });
        res.redirect("/");   
        } else {
          res.render("list", {day: day, lists: lists});
        }
      })
    .catch(err => console.error(err, "insert default"));
});

// ADDING A CARD TO DB

app.post("/", function(req, res) {
  try {
    const newCard = new Card({
      name: req.body.cardName,
      url: req.body.cardImg,
      body: req.body.cardBody,
      })
    db.collection('cards').insertOne(newCard)
    console.log("Card added to collection!")
    res.redirect("/")
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
});

// DELETING A CARD FROM DB

app.post("/delete", function(req,res){
  const cardID = req.body;
  const cardToDelete = mongoose.Types.ObjectId.createFromHexString(cardID.card)
  Card.findByIdAndRemove(cardToDelete)
    .then(function() {
      console.log("Card sucessfully removed");
      res.redirect("/");
    })
    .catch(function(err){
      console.log("Card could not be deleted!", err);
    }); 
});

// REMOVING ITEMS FROM THE LIST


// ADDING ITEMS TO THE LIST



// RENDERING THE ABOUT ME PAGE

const aboutContent =
  `I'm a dedicated Junior Software Engineer eager to contribute my skills to innovative projects. 
  
  With a solid foundation in mostly JavaScript (EJS, jQuerry, Node.JS, React.JS), and HTML/CSS coupled with my hands-on experience in building web applications and exploring emerging technologies, I'm excited about the opportunity to collaborate and learn from experienced professionals in the field.

  I am proactive, detail-oriented, and committed to continuous improvement.`


app.get("/contact", function(req, res){
  res.render("contact", {about: aboutContent});
});

// RENDERING INFO PAGE

const aboutAppContent =
  `This is a an app that mostly uses CSS/HTML and EJS for the front-end, uses Node.JS & Express.JS as a back-end, and MongoDB as a database.
  
  Basic Express.JS is used for connection with the MongoDB database, that stores Image links (except the default items, which are stored locally), image titles and image descriptions!
  
  To display the photos, HTML <input type="radio"> is used. App extensivelly uses flexbox CSS.
  
  I am using free Unsplash.com stock images.`

app.get("/about", function(req, res){
  res.render("about", {aboutApp: aboutAppContent});
});
 
app.listen(3000, function() {
  console.log("Server started on port 3000");
});