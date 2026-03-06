import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(
      req.body.email,
      req.body.password
    );
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};
