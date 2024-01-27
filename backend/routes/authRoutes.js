import express from "express"
import jwt from "jsonwebtoken"
const router = express.Router()

router.post("/verify-token", async (req, res, next) => {

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
        return res.status(401).json({ msg: 'Unauthorized: Token missing or invalid format' })
    }

    const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
        if (err) {
            return res.status(401).json({ msg: `Unauthorized: ${err.message}`})
        }
        req.user = decodedData;
        next();
    });
    res.status(200).send("ok");
});

export default router