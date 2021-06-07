/* istanbul ignore file */

// Placeholder to centralize logging and make it easier to add smarter loggers like Winston in the future. For now, all we do is log to
// console (CloudWatch) for all modes except 'test', which disables logging to keep test reports clean.
export const log = {
  info: process.env.NODE_ENV !== 'test' ? console.log : () => {},
  warn: process.env.NODE_ENV !== 'test' ? console.warn : () => {},
  error: console.error,
};
