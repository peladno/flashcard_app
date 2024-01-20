import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const USER_STORAGE_KEY = 'userid';

export type Set = {
  cards: number;
  description: string;
  creator: string;
  id: string;
  title: string;
  image?: Image | null;
  xata: Xata;
  private: boolean;
};

export type Card = {
  answer: string;
  id: string;
  question: string;
  image?: Image;
  set: string;
};

export type Image = {
  attributes: Attributes;
  enablePublicUrl: boolean;
  mediaType: string;
  name: string;
  signedUrlTimeout: number;
  size: number;
  uploadUrlTimeout: number;
  url: string;
  version: number;
};

export type Attributes = {
  height: number;
  width: number;
};

export type Xata = {
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

export type Progress = {
  set: Set;
  score: number;
  cards_correct: number;
  cards_wrong: number;
  xata: any;
};

export const createSet = async (set: Partial<Set>) => {
  const user = await AsyncStorage.getItem(USER_STORAGE_KEY);

  const response = await fetch(`${API_URL}/sets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...set, creator: user }),
  });
  return response.json();
};

export const getSets = async (): Promise<Set[]> => {
  const response = await fetch(`${API_URL}/sets`);
  return response.json();
};

export const deleteSet = async (setId: string) => {
  const response = await fetch(`${API_URL}/sets/${setId}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const getMySets = async (): Promise<
  { id: string; set: Set; canEdit: boolean }[]
> => {
  const user = await AsyncStorage.getItem(USER_STORAGE_KEY);

  const response = await fetch(`${API_URL}/usersets?user=${user}`);
  const data = await response.json();
  return data.map((item: any) => ({
    ...item,
    canEdit: item.set?.creator === user,
  }));
};

export const getSet = async (id: string): Promise<Set> => {
  const response = await fetch(`${API_URL}/sets/${id}`);
  return response.json();
};

export const addToFavorites = async (setId: string) => {
  const user = await AsyncStorage.getItem(USER_STORAGE_KEY);

  const response = await fetch(`${API_URL}/usersets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, setId }),
  });
  return response.json();
};

export const getLearnCards = async (setId: string, limit: string) => {
  const response = await fetch(
    `${API_URL}/cards/learn?setId=${setId}&limit=${limit}`
  );
  return response.json();
};

export const getCardsForSet = async (setId: string) => {
  const response = await fetch(`${API_URL}/cards?setId=${setId}`);
  return response.json();
};

export const createCard = async (card: Partial<Card>) => {
  const response = await fetch(`${API_URL}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  });
  return response.json();
};

export const saveLearning = async (
  setId: string,
  cardsTotal: number,
  correct: number,
  wrong: number
) => {
  const user = await AsyncStorage.getItem(USER_STORAGE_KEY);

  const response = await fetch(`${API_URL}/learnings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, set: setId, cardsTotal, correct, wrong }),
  });
  return response.json();
};

export const getUserLearnings = async () => {
  const user = await AsyncStorage.getItem(USER_STORAGE_KEY);

  const response = await fetch(`${API_URL}/progress?user=${user}`);
  return response.json();
};
