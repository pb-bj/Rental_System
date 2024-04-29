import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    let salt = await bcrypt.genSalt(10);
    let hashed_password = await bcrypt.hash(password, salt);

    // creating user
    let user = await User.create({ fullname, email, password: hashed_password });
    if (!user) {
      return res.status(500).json({ error: 'Failed to register' });
    }

    res.status(201).json({ message: 'Registered Successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return res.status(401).json({ error: 'Wrong credentials' });

    // token 
    const accessToken = jwt.sign({ id: user._id, fullname: user.fullname, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
    res.cookie('token', accessToken, { httpOnly: true, maxAge: Date.now() + 1 * 60 * 60 * 1000 })

    res.status(200).json({
      success: true,
      message: 'Login successsful',
      accessToken,
      user: {
        id: user._id,
        fullname: user.fullname,
        role: user.role
      }

    });

  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: 'Error while login' });

  }
};


