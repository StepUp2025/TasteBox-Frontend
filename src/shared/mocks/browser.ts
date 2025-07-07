import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/authHandlers';
import { collectionHandlers } from './handlers/collectionHandlers';
import { contentsHandlers } from './handlers/contentsHandlers';
import { genreHandlers } from './handlers/genreHandlers';
import { preferenceHandlers } from './handlers/preferenceHandler';
import { userHandlers } from './handlers/userHandlers';

const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...collectionHandlers,
  ...genreHandlers,
  ...contentsHandlers,
  ...preferenceHandlers,
];

export const worker = setupWorker(...handlers);
