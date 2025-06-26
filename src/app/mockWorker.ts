import { worker } from "../shared/mocks/browser";

export const startMockWorker = async () => {
  if (process.env.NODE_ENV === 'development') {
    await worker.start();
  }
};