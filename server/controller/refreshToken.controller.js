
// export const generateRefreshToken = async (req, res) => {
//     try {
//         const { id } = req.body;

//         const accessToken = jwt.sign({ id: id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '2m' });
//         const refreshToken = jwt.sign({ id: id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '10m' });

//         res.status(200).json({ message: 'regenerated tokens', accessToken, refreshToken });
//     } catch (error) {
//         console.error('Error generating new tokens:', error);
//         res.status(500).json({ message: 'Error generating new tokens' });
//         // next(errorHandler(500, 'Error generating new tokens'));
//     }
// };

// export const handleRefreshToken = async (req, res, next) => {
//     const cookies = req.cookies;
//     if (!cookies?.refreshToken) return res.status(401).json({ error: 'Invalid or missing refresh token' });
//     console.log(cookies.refreshToken);
//     const refreshToken = cookies.refreshToken;

//     const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//     if (!decoded.fullname) {
//         res.status(403)
//     }
//     const accessToken = jwt.sign({ fullname: decoded.fullname }, process.env.JWT_ACCESS_SECRET, { expiresIn: '30s' });
//     res.json({ accessToken })

// }

import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const generateRefreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).json({ error: 'No refresh token found' });
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        if (!decoded.id) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const accessToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const newRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });

        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}