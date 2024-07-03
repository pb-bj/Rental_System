export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: "This resource is restricted to admin only" })
    }

    next();
}

export const isUser = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(401).json({ error: "This resource is restricted to user only" })
    }

    next();
}