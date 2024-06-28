import jwt from "jsonwebtoken";
function splitString(string) {
    return string.split(' ');
}
export default function checkAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Authentification Failed, no auth header" });
    }
    else {
        const [tokenType, token] = splitString(req.headers.authorization);
        if (token && tokenType === 'Bearer') {
            const secret = process.env.JWT_SECRET;
            jwt.verify(token, secret, (err, decodedToken) => {
                if (err) {
                    return res
                        .status(401)
                        .json({ message: "Authentification Failed, try logging in again" });
                }
                else {
                    res.locals.user = decodedToken.id;
                    next();
                }
            });
        }
    }
}
//# sourceMappingURL=checkAuth.js.map