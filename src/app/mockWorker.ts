import { worker } from "../shared/mocks/browser";

export const startMockWorker = async () => {
  if (import.meta.env.DEV) {
    await worker.start();
  }
};
