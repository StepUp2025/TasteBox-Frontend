import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/authHandlers';
import { collectionHandlers } from './handlers/collectionHandlers';
import { genreHandlers } from './handlers/genreHandlers';
import { userHandlers } from './handlers/userHandlers';

const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...collectionHandlers,
  ...genreHandlers,
];

export const worker = setupWorker(...handlers);
