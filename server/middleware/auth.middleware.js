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

// export const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.accessToken;
//         if (!token) return res.status(401).json({ error: 'Access token is missing' });

//         jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
//             if (err) return res.status(403).json({ error: 'Invalid token' });

//             const user = await User.findById(decoded.id);
//             if (!user) return res.status(404).json({ error: 'User not found' });

//             req.user = user;
//             next();
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

