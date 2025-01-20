import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  
  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    return; 
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { userId: string };
    req.params.userId = decoded.userId; 
    next(); 
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
    return; 
  }
}
