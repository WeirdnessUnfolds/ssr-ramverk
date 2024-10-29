import jwt from 'jsonwebtoken';
function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        next();
    });
}
export default checkToken;
