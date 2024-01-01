import { client } from '..';
import { Request, Response, NextFunction } from 'express';
import logger from '../logger/logger';

const addCardToSet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info('Processing addCardToSet request...');
    const { set, question, answer } = req.body;
    const card = await client.db.cards.create({
      set,
      question,
      answer,
    });

    if (card) {
      await client.db.sets.update(set, {
        cards: {
          $increment: 1,
        },
      });
    }
    logger.info('addCardToSet request processed successfully.');
    return res.status(200).json(card);
  } catch (error) {
    logger.error(error, 'Error add card to set');
    res.status(500).json({ error: 'Error add card to set' });
  }
};

const getAllCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Processing getAllCards request...');
    const { setId } = req.query;
    const cards = await client.db.cards
      .select(['*', 'set.*'])
      .filter({ set: setId })
      .getAll();
    logger.info('getAllCards request processed successfully.');
    return res.status(200).json(cards);
  } catch (error) {
    logger.error('Error in getAllCards controller:', error);
    res.status(500).json({ error: 'Error in getAllCards controller' });
  }
};

const getCardsToLearn = async (
  res: Response,
  req: Request,
  next: NextFunction
) => {
  try {
    const { setId, limit } = req.query;
    const cards = await client.db.cards
      .select(['question', 'answer', 'image'])
      .filter({ set: setId })
      .getAll();
    const randomCards = cards
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, +limit!);
    return res.json(randomCards);
  } catch (error) {
    logger.error(error, 'Error getting cards to learn');
    res.status(500).json({ error: 'Error getting cards to learn' });
  }
};

const learning = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, set, cardsTotal, correct, wrong } = req.body;
    const obj = {
      user,
      set,
      cards_total: +cardsTotal,
      cards_correct: +correct,
      cards_wrong: +wrong,
      score: (correct / +cardsTotal) * 100,
    };
    const learning = await client.db.learnings.create(obj);
    return res.status(200).json(learning);
  } catch (error) {
    logger.error(error, 'Error at learning event');
    res.status(500).json({ error: 'Error at learning event' });
  }
};

const learningProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.query;
    const learning = await client.db.learnings
      .select(['*', 'set.*'])
      .filter({ user: `${user}` })
      .getAll();

    return res.status(200).json(learning);
  } catch (error) {
    logger.error(error, 'Error learning progress');
    res.status(500).json({ error: 'Error learning progress' });
  }
};

export {
  addCardToSet,
  getAllCards,
  getCardsToLearn,
  learning,
  learningProgress,
};
