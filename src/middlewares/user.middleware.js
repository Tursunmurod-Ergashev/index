module.exports = function (req, res, next) {
    const bearerHerader = req.headers['authorization'];
    if (typeof bearerHerader !== 'undefined') {
const bearer = bearerHerader.split(' ');
const bearerToken = bearer[1];
req.token = bearerToken;
next()
    } else {
        return res.status(403).json({
            message: 'token expires'
        })
    }
}
