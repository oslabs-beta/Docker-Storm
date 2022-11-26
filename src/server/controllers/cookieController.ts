import { Request, Response, NextFunction } from 'express';


interface CookieController {
    setCookie: (req: Request, res: Response, next: NextFunction) => void;
}



const cookieController: CookieController = {
  setCookie: (req, res, next) => {
    res.cookie('username', req.body.username);
    return next();
  }
};

export default cookieController;

