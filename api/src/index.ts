import express, { Request, Response, NextFunction, Application } from 'express';
import dotenv from 'dotenv';
import { XataClient } from './xata';
import { validationResult } from 'express-validator';
import { cardsCapitals, cardsProgramming, sets } from './seed_database';
import {
  createSet,
  deleteSet,
  getAllSets,
  getSetById,
  getSets,
  getUserSets,
  userSetFav,
} from './controllers/set.controller';
import {
  addCardToSet,
  getAllCards,
  getCardsToLearn,
  learning,
  learningProgress,
} from './controllers/card.controller';
import logger from './logger/logger';
import cors from 'cors';

dotenv.config();

const { PORT } = process.env || 3000;
const app: Application = express();

app.use(express.json({ limit: '50mb' }));

export const client = new XataClient({ apiKey: process.env.XATA_API_KEY });

//---------- middlewares ---------
const validateSet = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
};
//------- end middlewares -------
app.use(cors());
app.use(errorHandler);

app.get('/init', async (req: Request, res: Response) => {
  try {
    await client.db.sets.create(sets);
    await client.db.cards.create(cardsCapitals);
    await client.db.cards.create(cardsProgramming);

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', getAllSets);
app.get('/sets', getSets);
app.get('/sets/:id', getSetById);
app.post('/sets', validateSet, createSet);
app.post('/usersets', userSetFav);
app.get('/usersets', getUserSets);
app.delete('/sets/:id', deleteSet);
app.get('/cards', getAllCards);
app.post('/cards', addCardToSet);
app.get('/cards/learn', getCardsToLearn);
app.post('/cards/learnings', learning);
app.post('/cards/progress', learningProgress);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
