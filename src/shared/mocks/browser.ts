import { setupWorker } from "msw/browser";
import { authHandlers } from "./handlers/authHandlers";
import { userHandlers } from "./handlers/userHandlers";

const handlers = [...authHandlers, ...userHandlers];

export const worker = setupWorker(...handlers);
