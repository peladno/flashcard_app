import { client } from '..';
import { Request, Response, NextFunction } from 'express';
import { SetsRecord } from '../xata';
import logger from '../logger/logger';

const createSet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, private: isPrivate, creator, image } = req.body;

    // Validation checks for request body
    if (!title || typeof title !== 'string') {
      logger.error('Title is required and must be a string');
      return res
        .status(400)
        .json({ error: 'Title is required and must be a string' });
    }

    if (!description || typeof description !== 'string') {
      logger.error('Description is required and must be a string');
      return res
        .status(400)
        .json({ error: 'Description is required and must be a string' });
    }

    if (typeof isPrivate !== 'boolean') {
      logger.error('Private must be true or false and must be a boolean');
      return res
        .status(400)
        .json({ error: 'Private must be true or false and must be a boolean' });
    }

    if (!creator || typeof creator !== 'string') {
      logger.error('Creator is required and must be a string');
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
    logger.error(error, 'Error creating set');
    res.status(500).json({ error: 'Error creating set' });
  }
};

const getAllSets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sets = await client.db.sets.getAll();
    return res.status(200).json({ results: sets });
  } catch (error) {
    logger.error(error, 'Error getting all set');
    res.status(500).json({ error: 'Error getting all set' });
  }
};

const getSets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allSets = await client.db.sets
      .select(['id', 'title', 'description', 'image', 'cards'])
      .filter({ private: false })
      .getAll();

    return res.status(200).json(allSets);
  } catch (error) {
    logger.error(error, 'Error getting sets');
    res.status(500).json({ error: 'Error getting sets' });
  }
};

const getSetById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const set = await client.db.sets.read(id);
    return res.status(200).json(set);
  } catch (error) {
    logger.error(error, 'Error getting set by id');
    res.status(500).json({ error: 'Error getting set set by id' });
  }
};

const userSetFav = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, setId: set } = req.body;

    const getSets = await client.db.user_sets
      .select(['id', 'set.*'])
      .filter({ user: `${user}`, 'set.id': set })
      .getAll();

    if (getSets.length === 0) {
      const userSet = await client.db.user_sets.create({
        user,
        set,
      });
      return res.status(200).json(userSet);
    } else {
      return res.status(302).json({ message: 'Set already on favorites' });
    }
  } catch (error) {
    logger.error(error, 'Error setting fav set');
    res.status(500).json({ error: 'Error setting fav set' });
  }
};

const getUserSets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.query;

    const sets = await client.db.user_sets
      .select(['id', 'set.*'])
      .filter({ user: `${user}` })
      .getAll();
    return res.status(200).json(sets);
  } catch (error) {
    logger.error(error, 'Error getting set by user');
    res.status(500).json({ error: 'Error getting set by user' });
  }
};

const deleteSet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const existingSets = await client.db.user_sets.filter({ set: id }).getAll();
    if (existingSets.length > 0) {
      const toDelete = existingSets.map((set: SetsRecord) => set.id);
      await client.db.user_sets.delete(toDelete);
    }
    await client.db.sets.delete(id);
    return res.json({ success: true });
  } catch (error) {
    logger.error(error, 'Error deleting set');
    res.status(500).json({ error: 'Error deleting set' });
  }
};

export {
  createSet,
  getAllSets,
  getSetById,
  getSets,
  userSetFav,
  getUserSets,
  deleteSet,
};
