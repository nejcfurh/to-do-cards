/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

// PACKAGES
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { expressjwt } from 'express-jwt';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const JWT_TOKEN = process.env.JWT_TOKEN;
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

// ITEM SCHEMA

const itemsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// const Item = mongoose.model('Item', itemsSchema);

// LIST SCHEMA

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  body: { type: String, required: false },
  items: [itemsSchema],
});

const List = mongoose.model('List', listSchema);

// USER SCHEMA

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide an email!'],
    unique: false,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email!'],
    unique: [true, 'Email Exists!'],
  },

  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    unique: false,
  },

  lists: [listSchema],
});

const User = mongoose.model('User', userSchema);

// MIDDLEWARE

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const requireAuth = expressjwt({
  secret: process.env.JWT_TOKEN,
  algorithms: ['HS256'],
  userProperty: 'auth',
});

// API ENDPOINTS

// REGISTER USER
app.post('/api/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const result = await user.save();
    console.log(result);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_TOKEN, {
      expiresIn: '24h',
    });

    res.status(201).send({
      message: 'User Created Successfully',
      token,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error creating user',
      error,
    });
  }
});

//LOGIN USER
app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        message: 'User with this email was not found!',
      });
    }

    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCheck) {
      console.log('Password mismatch');
      return res.status(400).send({
        message: 'Password incorrect!',
      });
    }

    // Create JWT token if the password matches
    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      JWT_TOKEN,
      { expiresIn: '24h' }
    );

    // Return success response if login is successful
    res.status(200).send({
      message: 'Login Successful',
      email: user.email,
      token,
    });
    console.log('Login successful!');
  } catch (error) {
    // Generic error response for unexpected errors
    res.status(500).send({
      message: 'An error occurred during login',
      error: error.message,
    });
    console.log('Login failed!');
  }
});

// RENDERING THE LIST OF CARDS FROM DB
app.get('/api/todos', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.auth.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const lists = user.lists || [];
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

// // RENDERING THE LIST OF CARDS FROM DB -- no auth
// app.get('/api/todos', async (req, res) => {
//   try {
//     const lists = await List.find({});
//     res.json({
//       success: true,
//       message: 'Lists retrieved successfully',
//       data: lists,
//       count: lists.length,
//       defaultListName: 'Daily',
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error loading lists!' });
//   }
// });

// CREATING THE CARD AND SAVING IT TO DB
app.post('/api/todos/addCard', requireAuth, async (req, res) => {
  const { listName: name, listImg: url, listBody: body, items } = req.body;

  try {
    const user = await User.findById(req.auth.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newList = { name, url, body, items };

    user.lists.push(newList);
    await user.save();

    console.log(
      `Card titled "${name}" was successfully added to the "${user.email}" collection of lists!`
    );

    res.status(201).json({
      success: true,
      message: 'List added successfully!',
      data: user.lists,
      defaultListName: name,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error saving new card!' });
  }
});

// DELETING THE CARD FROM DB
app.post('/api/todos/deleteCard', requireAuth, async function (req, res) {
  const { listId } = req.body;

  try {
    const user = await User.findById(req.auth.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const listIndex = user.lists.findIndex(list => list._id.equals(listId));
    if (listIndex === -1) {
      return res.status(404).json({ message: 'List not found' });
    }

    user.lists.splice(listIndex, 1);
    await user.save();

    console.log(
      `Card was successfully removed from the user's collection of lists!`
    );
    res.json({
      success: true,
      data: user.lists,
      defaultListName: 'Daily',
      message: 'Updated lists retrieved successfully!',
    });
  } catch (err) {
    console.log('Card could not be deleted!', err);
    res.status(500).json({ error: 'Card could not be deleted!' });
  }
});

// // DELETING THE CARD FROM DB -- no auth
// app.post('/api/todos/deleteCard', requireAuth, async function (req, res) {
//   const listID = req.body;
//   try {
//     const listToDelete = mongoose.Types.ObjectId.createFromHexString(
//       listID.card
//     );
//     await List.findByIdAndDelete(listToDelete);
//     console.log(`Card was successfully removed from the collection of lists!`);
//     const updatedLists = await List.find({});
//     res.json({
//       success: true,
//       data: updatedLists,
//       defaultListName: 'Daily',
//       message: 'Updated lists retrieved successfully!',
//     });
//   } catch (err) {
//     console.log('Card could not be deleted!', err);
//     res.status(500).json({ error: 'Card could not be deleted!' });
//   }
// });

// ADDING TODOS (ITEMS) TO THE LIST
app.post('/api/todos/addItems', requireAuth, async (req, res) => {
  const { newItem, list: listName } = req.body;
  const userId = req.auth.userId;

  try {
    const user = await User.findOne({ _id: userId, 'lists.name': listName });
    if (!user) {
      return res.status(404).json({ message: 'List not found for this user' });
    }

    const result = await User.updateOne(
      { _id: userId, 'lists.name': listName },
      { $push: { 'lists.$.items': { name: newItem } } }
    );

    const updatedUser = await User.findById(userId);
    const updatedLists = updatedUser.lists;

    res.json({ success: true, data: updatedLists, defaultListName: listName });
  } catch (error) {
    console.error('Error occurred while updating document:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// // ADDING TODOS (ITEMS) TO THE LIST -- no auth
// app.post('/api/todos/addItems', requireAuth, async (req, res) => {
//   const newItem = req.body.newItem;
//   const listName = req.body.list;
//   try {
//     const filter = { name: listName };
//     const updateDocument = { $push: { items: { name: newItem } } };
//     await List.updateOne(filter, updateDocument);
//     const updatedLists = await List.find({});
//     res.json({ success: true, data: updatedLists, defaultListName: listName }); // Send JSON response
//   } catch (error) {
//     console.error('Error occurred while updating document:', error);
//     res.status(500).json({ error: 'Failed to add item' });
//   }
// });

// DELETING TODOS (ITEMS) FROM THE LIST
app.delete('/api/todos/deleteItem', requireAuth, async (req, res) => {
  const { listName, itemId } = req.body;
  const userId = req.auth.userId;

  try {
    const user = await User.findOne({ _id: userId, 'lists.name': listName });
    if (!user) {
      return res.status(404).json({ message: 'List not found' });
    }
    const result = await User.updateOne(
      { _id: userId, 'lists.name': listName },
      { $pull: { 'lists.$.items': { _id: itemId } } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: 'Item not found or could not be deleted' });
    }

    console.log(
      `Successfully deleted an item with ID: ${itemId} from "${listName}" task list!`
    );

    const updatedUser = await User.findById(userId);
    const updatedLists = updatedUser.lists;

    res.json({ success: true, data: updatedLists, defaultListName: listName });
  } catch (error) {
    console.error('Error occurred while deleting document:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// // DELETING TODOS (ITEMS) FROM THE LIST -- no auth
// app.delete('/api/todos/deleteItem', requireAuth, async (req, res) => {
//   const { listName, itemId } = req.body;
//   try {
//     const result = await List.updateOne(
//       { name: listName },
//       { $pull: { items: { _id: itemId } } }
//     );
//     console.log(
//       `Number of deleted items: ${result.modifiedCount} - Successfully deleted an item with ID: ${itemId} from "${listName}" task list!`
//     );
//     const updatedLists = await List.find({});
//     res.json({ success: true, data: updatedLists, defaultListName: listName }); // Send JSON response
//   } catch (error) {
//     console.error('Error occurred while deleting document:', error);
//     res.redirect('/');
//   }
// });

//GETTING USER INFORMATION FROM THE DB
app.get('/api/account', requireAuth, async (req, res) => {
  const userId = req.auth.userId;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      data: user,
      message: 'User data retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// START THE SERVER

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
