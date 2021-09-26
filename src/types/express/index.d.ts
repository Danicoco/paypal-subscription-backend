import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        id?: any,
        email?: string
      }
    }
  }  
}