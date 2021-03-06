// This module allows us to extend express.Request to add elements other middlewares can "see", without hacks like req['user'].

declare namespace Express {
  export interface Request {
    user?: {
      sub: string;
    };

    [name: string]: any;
  }
}
