import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs'

export const registerUser = async (req, res) => {
  try {
    const { email, fullname, password } = req.body;

    // hash password 
    let salt = await bcrypt.genSalt(10)
    let hashed_password = await bcrypt.hash(password, salt)
    if (!hashed_password) {
      return res.status(503).json({ error: "Something went wrong" })
    }

    // check for exisiting user 
    let exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(400).json({ message: 'User Already Exists ' })
    }

    // create user
    let user = await User.create({ email, fullname, password: hashed_password })
    if (!user) {
      return res.status(400).json({ error: 'Failed to create user' });
    }

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error while signing up' });
  }
}


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Username not found' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ error: 'Invalid Password' });
    }

    res.json({ message: "Login Successfull" });
  } catch (err) {
    res.status(500).json({ error: 'Error while logged in' });
  }
};

