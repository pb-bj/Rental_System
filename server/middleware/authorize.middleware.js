// export const authorize = (role = []) => {
//     return async (req, res, next) => {
//         try {
//             if (!role.includes(req.user.role)) {
//                 return res.status(401).json({ error: 'Unauthorized' });
//             }

//             next()
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     }
// }

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