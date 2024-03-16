// const bcrypt = require('bcryptjs');
// const User = require('../models/UserModel');
// const jwt = require('jsonwebtoken');

// const SECRECT_KEY = "secrectsauce";

// exports.registerUser = async (req, res) => {
//   try {
//     const { email, username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ email, username, password: hashedPassword });
//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Error while signing up' });
//   }
// }

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'Unable to get the users' });
//   }
// };

// exports.loginUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ error: 'Username not found' });
//     }

//     const checkPassword = await bcrypt.compare(password, user.password);
//     if (!checkPassword) {
//       return res.status(401).json({ error: 'Invalid Password' });
//     }

//     const token = jwt.sign({ userId : user._id}, SECRECT_KEY, { expiresIn :'1hr'});
//       res.json({ message : "Login Successfull" });
//   } catch (err) {
//     res.status(500).json({ error: 'Error while logged in' });
//   }
// };

