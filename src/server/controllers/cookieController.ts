import { ResponseObject } from '../../types.js';


interface CookieController {
    setCookie: ResponseObject;
}



const cookieController: CookieController = {
  setCookie: (req, res, next) => {
    res.cookie('username', req.body.username);
    return next();
  }
};

export default cookieController;

