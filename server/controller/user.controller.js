import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

// export const registerUser = async (req, res) => {
//   try {
//     const { fullname, email, password } = req.body;

//     // check for exisiting user
//     let exisitingUser = await User.findOne({ email });
//     if (exisitingUser) {
//       return res.status(400).json({ error: "Email address already in use" })
//     }

//     // hash password
//     let salt = await bcrypt.genSalt(10)
//     let hashed_password = await bcrypt.hash(password, salt)


//     // create user
//     let user = await User.create({ email, fullname, password: hashed_password })
//     if (!user) {
//       return res.status(400).json({ error: 'Failed to create user' });
//     }

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Error while signing up' });
//   }
// }

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    let salt = await bcrypt.genSalt(10);
    let hashed_password = await bcrypt.hash(password, salt);

    // creating user
    let user = await User.create({ fullname, email, password: hashed_password });
    if (!user) {
      return res.status(400).json({ error: 'Failed to register' });
    }
    res.status(201).json({ message: 'Registered Successful' });

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('Error in register', error)
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

    // token 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const options = {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    }
    res.status(201).cookie('accessToken', token, options).json({ message: 'Login successful', token });

  } catch (err) {
    res.status(500).json({ error: 'Error while logged in' });
  }
};

