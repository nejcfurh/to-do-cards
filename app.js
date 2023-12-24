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

// // ITEMS SCHEMA

// const itemsSchema = {
//   name: {
//     required: true,
//     type: String
//   }
// };

// const Item = mongoose.model('item', itemsSchema);

// const item1 = new Item({
//   name: "Welcome to your To-Do List App!"
// });
// const item2 = new Item({
//   name: "Hit the + button to add a new item!"
// });
// const item3 = new Item({
//   name: "Mark check button to delete an item!"
// });

// const defaultItems = [item1, item2, item3];

// // LIST SCHEMA

// const listSchema = {
//   name: String,
//   items: [itemsSchema]
// }

// const List = mongoose.model('list', listSchema);

// CARDS SCHEMA

const cardSchema = {
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
  }
};

const Card = mongoose.model('card', cardSchema);

const card1 = new Card({
  name: "Chicago",
  url: `../photos/image1.jpg`,
  body: "Chicago skyline is one of the best in the world!"
})

const card2 = new Card({
  name: "Home",
  url: `../photos/image2.jpg`,
  body: "Calling a house home is fulfiling!"
})

const card3 = new Card({
  name: "School",
  url: `../photos/image3.jpg`,
  body: "Going to school is the best time you will ever have!"
})

const card4 = new Card({
  name: "Bali",
  url: `../photos/image4.jpg`,
  body: "Bali is nice every season of the year!"
})

const defaultCards = [card1, card2, card3, card4]

app.get("/", function(req, res) {
  res.render("list", {cardItems: defaultCards})
});

app.post("/", function(req, res) {
  console.log(req.body.cardName) 
  console.log(req.body.cardImg)
  console.log(req.body.cardBody)

  try {
    const newCard = new Card({
      name: req.body.cardName,
      url: req.body.cardImg,
      body: req.body.cardBody,
    })
    console.log(newCard)
    console.log(defaultCards)
    defaultCards.push(newCard)
    console.log(defaultCards)
    res.redirect("/")
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
});

app.get("/about", function(req, res){
  res.render("about");
});
 
app.listen(3000, function() {
  console.log("Server started on port 3000");
});