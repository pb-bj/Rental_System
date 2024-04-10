
export const authorize = (role = []) => {
    return async (req, res, next) => {
        try {
            if (!role.includes(req.user.role)) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            next()
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}