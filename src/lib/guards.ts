import {Request, Response} from 'express';

// Ensure the caller has a valid session.
export const sessionValid = async (req: Request, res: Response, next: Function) => {
  if (!req.user) {
    res.status(401).json({error: 'Unauthorized'});
  } else {
    next();
  }
};
