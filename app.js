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
  mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.06chanb.mongodb.net/CardsDB`, {useNewUrlParser: true});
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

const defaultCards = [card1, card2, card3, card4];

// Save initial array of cards to DB!

// defaultCards.map((card) => {
//   db.collection('cards').insertOne(card, (err, result) => {
//     if (err) return console.log(err)
//     console.log('Saved to database')
//   })
// });

// RENDERING THE LIST OF CARDS from DB

app.get("/", function(req, res) {
  Card.find({})
    .then(cards => 
      {
        if(cards.length === 0)
        {
          Item.insertMany(defaultCards)
          .then(function() {
            console.log("Filled cards with defaultItems");
          })
          .catch(function(err) {
            console.log(err);
          });
        res.redirect("/");   
        } else {
          res.render("list", {cardItems: cards});
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

// RENDERING THE ABOUT PAGE

app.get("/about", function(req, res){
  res.render("about");
});
 
app.listen(3000, function() {
  console.log("Server started on port 3000");
});