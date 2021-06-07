import express, {Request} from 'express';

// Opinionated middleware that combines path, query, and body params into a single key:value object. This makes Express more familiar to
// developers from other frameworks that do the same thing (where developers don't need to explicitly remember/differentiate between path
// and query parameters for example).
export const parseParams = (req: Request, _: express.Response, next: Function) => {
  req.parsedParams = {};

  try {
    Object.entries(req.params).forEach(([key, value]) => (req.parsedParams[key] = value));
  } catch (e) {
    // NOP
  }

  try {
    Object.entries(req.query).forEach(([key, value]) => (req.parsedParams[key] = value));
  } catch (e) {
    // NOP
  }

  try {
    Object.entries(req.body).forEach(([key, value]) => (req.parsedParams[key] = value));
  } catch (e) {
    // NOP
  }

  console.log('Merged params', req.parsedParams);
  next();
};
