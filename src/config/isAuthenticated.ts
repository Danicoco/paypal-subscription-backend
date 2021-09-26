import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';

interface Decode {
  id: string,
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  try {
    if (!token || token === null) return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });

    //decode jwt
    const decoded = jwt.verify(token, process.env.JWTSEC || "") as Decode;

    //verify user from db
    const user = await User.findOne().where('_id').equals(decoded.id);
    if (!user || user === null) return res.status(400).json({
      success: false,
      message: "Invalid User"
    });
    req.user = {
      id: user._id
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Session expired. Please sign in."
    });
  }
}

export default isAuthenticated;