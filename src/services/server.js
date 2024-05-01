/* eslint-disable no-undef */
'use strict';

// PACKAGES

import dotenv from 'dotenv';
dotenv.config({ path: '../../.env.local' });
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONNECTING TO MONGO_DB

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.06chanb.mongodb.net/ToDoListDB`
  )
  .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Successfully connected to MongoDB');
});

// DEFININGS SCHEMAS and MODELS

const itemsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// const Item = mongoose.model('Item', itemsSchema);

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  body: { type: String, required: false },
  items: [itemsSchema],
});
const List = mongoose.model('List', listSchema);

// MIDDLEWARE

app.use(cors());
app.use(bodyParser.json()); // Updated for JSON body parsing
app.use(express.static(__dirname + '/public'));

// API ENDPOINTS

// RENDERING THE LIST OF CARDS FROM DB
app.get('/api/todos', async (req, res) => {
  try {
    const lists = await List.find({});
    res.json({
      success: true,
      message: 'Lists retrieved successfully',
      data: lists,
      count: lists.length,
      defaultListName: 'Daily',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error loading lists!' });
  }
});

// CREATING THE CARD AND SAVING IT TO DB
app.post('/api/todos/addCard', async (req, res) => {
  const { listName: name, listImg: url, listBody: body, items } = req.body;
  const newList = new List({ name, url, body, items });
  try {
    await db.collection('lists').insertOne(newList);
    console.log(
      `Card titled "${name}" was successfully added to the collection of lists!`
    );
    const updatedLists = await List.find({});
    res.status(201).json({
      success: true,
      message: 'Lists retrieved successfully!',
      data: updatedLists,
      count: updatedLists.length,
      defaultListName: name,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error saving new card!' });
  }
});

// DELETING THE CARD FROM DB
app.post('/api/todos/deleteCard', async function (req, res) {
  const listID = req.body;
  try {
    const listToDelete = mongoose.Types.ObjectId.createFromHexString(
      listID.card
    );
    await List.findByIdAndDelete(listToDelete);
    console.log(`Card was successfully removed from the collection of lists!`);
    const updatedLists = await List.find({});
    res.json({
      success: true,
      data: updatedLists,
      defaultListName: 'Daily',
      message: 'Lists retrieved successfully!',
    });
  } catch (err) {
    console.log('Card could not be deleted!', err);
    res.status(500).json({ error: 'Card could not be deleted!' });
  }
});

// ADDING TODOS (ITEMS) TO THE LIST
app.post('/api/todos/addItems', async (req, res) => {
  const newItem = req.body.newItem;
  const listName = req.body.list;
  try {
    const filter = { name: listName };
    const updateDocument = { $push: { items: { name: newItem } } };
    await List.updateOne(filter, updateDocument);
    const updatedLists = await List.find({});
    res.json({ success: true, data: updatedLists, defaultListName: listName }); // Send JSON response
  } catch (error) {
    console.error('Error occurred while updating document:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

app.delete('/api/todos/deleteItem', async (req, res) => {
  const { listName, itemId } = req.body;
  try {
    const result = await List.updateOne(
      { name: listName },
      { $pull: { items: { _id: itemId } } }
    );
    console.log(
      `Number of deleted items: ${result.modifiedCount} - Successfully deleted an item with ID: ${itemId} from "${listName}" task list!`
    );
    const updatedLists = await List.find({});
    res.json({ success: true, data: updatedLists, defaultListName: listName }); // Send JSON response
  } catch (error) {
    console.error('Error occurred while deleting document:', error);
    res.redirect('/');
  }
});

// START THE SERVER

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
