// import jwt from 'jsonwebtoken';

// export const isAuthenticated = async (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) return res.status(401).json({ error: 'Access Denied' });
//     console.log(authHeader);

//     try {
//         const token = authHeader.split(' ')[1];
//         jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
//             if (err) {
//                 return res.status(403).json({ error: 'Invalid token' });
//             }

//         });
//         // if (!decoded.fullname) {
//         //     res.status(403).json({ error: 'Invalid token' })
//         // };
//         // req.user = decoded.fullname;

//         // res.status(200).json({ success: true, message: 'Authentication successful', user: req.user });
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Invalid ' });
//     }
// };


import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Access token is missing' });

        jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ error: 'Invalid token' });

            const user = await User.findById(decoded.id);
            if (!user) return res.status(404).json({ error: 'User not found' });

            req.user = user;
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

