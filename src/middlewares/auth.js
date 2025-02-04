import jwt from "jsonwebtoken";

export function autenticarToken(req, res, next) {
    const token = req.header("Authorization");
    
    if (!token) {
        return res.status(401).json({ message: "Acesso negado!" });
    }

    jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido!" });
        }
        req.user = user;
        next();
    });
}
