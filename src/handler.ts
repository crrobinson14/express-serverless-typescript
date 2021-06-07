import serverlessHttp from 'serverless-http';
import {connectDb} from './lib/orm';
import {app} from './app';

export const handler = serverlessHttp(app, {
  // Connect to the database (if needed) before handling the request
  // Ssee https://github.com/dougmoscrop/serverless-http/blob/master/docs/ADVANCED.md#transformations
  async request(req: any, event: any) {
    req.context = event.requestContext;
    await connectDb();
  },
});
