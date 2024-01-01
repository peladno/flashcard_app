import { client } from '..';
import { Request, Response, NextFunction } from 'express';

const createSet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, private: isPrivate, creator, image } = req.body;

    // Validation checks for request body
    if (!title || typeof title !== 'string') {
      return res
        .status(400)
        .json({ error: 'Title is required and must be a string' });
    }

    if (!description || typeof description !== 'string') {
      return res
        .status(400)
        .json({ error: 'Description is required and must be a string' });
    }

    if (typeof isPrivate !== 'boolean') {
      return res
        .status(400)
        .json({ error: 'Private must be true or false and must be a boolean' });
    }

    if (!creator || typeof creator !== 'string') {
      return res
        .status(400)
        .json({ error: 'Creator is required and must be a string' });
    }

    const set = await client.db.sets.create({
      title,
      description,
      private: isPrivate,
      creator,
      image: image
        ? {
            base64Content: image,
            mediaType: 'image/png',
            enablePublicUrl: true,
          }
        : null,
    });

    return res.status(200).json(set);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

const getAllSets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sets = await client.db.sets.getAll();
    return res.status(200).json({ results: sets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allSets = await client.db.sets
      .select(['id', 'title', 'description', 'image', 'cards'])
      .filter({ private: false })
      .getAll();

    return res.json(allSets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSetById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const set = await client.db.sets.read(id);
    return res.status(200).json(set);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const userSetFav = async (req: Request, res: Response, next: NextFunction) => {
  const { user, set } = req.body;
  const userSet = await client.db.user_sets.create({
    user,
    set,
  });

  return res.status(200).json(userSet);
};

const getUserSets = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.query;

  const sets = await client.db.user_sets
    .select(['id', 'set.*'])
    .filter({ user: `${user}` })
    .getAll();
  return res.status(200).json(sets);
};

export { createSet, getAllSets, getSetById, getSets, userSetFav, getUserSets };
