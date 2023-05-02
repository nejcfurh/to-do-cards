'use strict';

// modules

const username = require(__dirname + "/auth.js").username;

const password = require(__dirname + "/auth.js").password;

console.log(password, username);

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

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model('list', listSchema);

app.get("/", function(req, res) {
  Item.find({})
    .then(items => {
      if(items.length === 0){
        Item.insertMany(defaultItems).then(function() {
          console.log("Sucessful");
        }) .catch(function(err){
          console.log(err);
        });
        res.redirect("/");   
      } else {
        res.render("list", {listTitle: day, newListItems: items});
      }}).catch(err => console.error(err, "insert default"));
});

app.get("/:customListName", async function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
  await List.findOne({ name: customListName })
    .then(async function (foundList) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        await list.save();
        res.redirect("/" + customListName);
      } else {
        //show an existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    })
    .catch((err) => console.log(err));
}),
 
app.post("/", function(req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: itemName
  });
 
  if(listName === day){
    newItem.save(); 
    res.redirect("/");
  } else {
    List.findOne({name: listName})
    .then(function(result) {
      result.items.push(newItem);
      result.save();
      res.redirect("/" + listName);
    }).catch((err) => console.log(err, "post"));
  }
});
 
app.post("/delete", function(req,res){
  const checkedItemID = req.body.checkbox;
  const listName = req.body.listName;
 
  if (listName === day){
    Item.findByIdAndRemove(checkedItemID).then(function(){
      console.log("Item sucessfully removed");
    }) .catch(function(err){
      console.log(err);
    }); 
    res.redirect("/");
  } else {
    List.findOneAndUpdate({name: listName}, {$pull:{ items:{_id:checkedItemID }}}, {new: true}).then(function(foundList) {
      console.log("Custom list item removed!")
      res.redirect("/" + listName);
    }).catch( err => console.log(err, "delete"));
  }
});

app.get("/about", function(req, res){
  res.render("about");
});
 
app.listen(3000, function() {
  console.log("Server started on port 3000");
});