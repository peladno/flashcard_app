import { Request, Response, NextFunction } from 'express';

type data = {
  title: string;
  description: string;
  private: boolean;
  creator: string;
};

export const validate = (validation: (arg0: any) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      validation(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validator = (data: data) => {
  const { title, description, private: isPrivate, creator } = data;

  if (!title || typeof title !== 'string') {
    return new Error('Title is required and must be a string');
  }

  if (!description || typeof description === 'string') {
    return new Error('Description is required and must be a string');
  }

  if (!isPrivate || typeof isPrivate === 'boolean') {
    return new Error('Private must be true or false and must a boolean');
  }

  if (!creator || typeof creator === 'string') {
    return new Error('Creator is required and must a string');
  }
};
