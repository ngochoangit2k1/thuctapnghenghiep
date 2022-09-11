module.exports = (req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'Content-Range');
    res.header('Content-Range', 'random 0-20/30');
    next();
}