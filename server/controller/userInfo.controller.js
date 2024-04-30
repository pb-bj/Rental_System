import { User } from "../models/user.model.js";

export const userDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const details = await User.findById(userId);
        if (!details) return res.status(400).json({ error: 'User detail not found' });

        res.status(200).json({ message: 'User details', data: details });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const loggedCustomerCount = async (req, res) => {
    try {
        const totalCustomerCount = await User.countDocuments({ role: 'user' });
        if (!totalCustomerCount) return res.status(400).json({ error: 'Failed to get customer count' });

        res.status(200).json({ message: 'Customer Count', totalCustomerCount });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}