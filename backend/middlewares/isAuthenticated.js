import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "User Not Authorized",
                success: false
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        req.id = decode.userId;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid Token",
            success: false
        });
    }
};

export default isAuthenticated;