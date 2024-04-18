import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email alredy in use' });
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
    res.status(500).json({ message: error.message });
    console.log(error);
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
    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });

    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 30 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({ success: true, message: 'Login successsful', id: user._id, fullname: user.fullname, role: user.role });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: 'Error while login' });

  }
};


