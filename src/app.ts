import cors from 'cors';
import morgan from 'morgan';
import jwt from 'express-jwt';
import cookieParser from 'cookie-parser';
import express, {Request, json} from 'express';
import {Users} from './modules/users';
import {log} from './lib/log';

export const app = express();

// Use morgan for logging, but not if we're in the test suite. We also ignore CORS-related OPTIONS requests and ELB healthcheck endpoints
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', {skip: (req: Request) => req.url === '/health_check' || req.method === 'OPTIONS'}));
}

// Add a simple health-check endpoint
app.get('/health', (_, res) => res.json({status: 'OK'}));

// Parse JSON request bodies. See https://expressjs.com/en/api.html#express.json for options, e.g. to increase the base 100k limit.
app.use(json());

// Parse cookies. See https://expressjs.com/en/resources/middleware/cookie-parser.html for options, e.g. to parse signed cookies.
// Secure, Https-only cookies are a good alternative to JWTs for apps that want the highest protection from auth token theft because
// they're sandboxed, so the front-end app can't even see/touch them.
app.use(cookieParser());

// Enable CORS. See https://github.com/expressjs/cors. For maximum security, examine the first parameter (origin) and allow only those
// endpoints you actually own/operate.
app.use(cors({origin: (_, callback) => callback(null, true), credentials: true}));

// Enable JWT decoding. We decode globally but don't require the credentials. This means you can create anonymous endpoints that can still
// "know" if it's a real user calling. Note that you do not need to specify audience and issuer, but there are good reasons to do that if
// you can.
app.use(jwt({secret: process.env.JWT_SECRET || 'BOGUS', audience: 'http://myapp/protected', issuer: 'https://myapp', algorithms: ['HS256']}));

// Activate our primary modules
app.use('/', [
  new Users().router, //
  // new Companies().router,
  // Etc. The empty comment forces Prettier to put these on separate lines even if you only have a few modules.
]);

// Add an error handler for unknown routes
app.use((_, res) => res.status(404).json({error: 'NOT FOUND'}));

// Add consistent error handling for routes that throw exceptions. For Express to recognize this as an error handler it must take four
// arguments even if it doesn't use them. This must also be last.
// @ts-ignore
app.use((err, req, res, next) => {
  const errorCode = err && err.code && typeof err.code === 'number' ? err.code : 500;
  log.error(err.message, err);
  res.status(errorCode).send({error: err.message});
});
