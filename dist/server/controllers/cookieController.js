const cookieController = {
    setCookie: (req, res, next) => {
        res.cookie('username', req.body.username);
        return next();
    }
};
export default cookieController;
