import { ResponseObject } from '../../types.js';


interface CookieController {
    setCookie: ResponseObject;
}

// Method which will add a new cookie with the current username and move to the next middleware
const cookieController: CookieController = {
  setCookie: (req, res, next) => {
    res.cookie('username', req.body.username);
    return next();
  }
};

export default cookieController;

