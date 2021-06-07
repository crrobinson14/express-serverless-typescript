// This module allows us to extend express.Request to add elements other middlewares can "see", without TS hacks.

declare namespace Express {
  export interface Request {
    parsedParams: Record<string, any>;
    [name: string]: any;
  }
}
