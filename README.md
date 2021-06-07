# Project Template for a Serverless + ExpressJS + TypeScript stack

> Opinionated stack that includes formatting rules for Prettier, an ORM via Sequelize, and other tools I commonly use in my projects.
> Customize to suit.

## Development

To use this template you will need a recent (v14+) version of NodeJS installed locally. I strongly recommend using
[NVM](https://github.com/nvm-sh/nvm) to do this.

Run `yarn` to install the base dependencies, then use the following commands to work on and deploy the project:

`yarn dev` - Run Serverless Offline locally. Code changes will be live-reloaded, but bear in mind the TypeScript compiler must run so allow
a few seconds before testing code updates. The local server will listen on [http://localhost:4000](http://localhost:4000) to avoid
conflicting with typical React / Vue apps running on port 3000.

`yarn deploy-prod` - Deploy to Production. Clone this script for other desired environment names, e.g. staging. Avoid using `development`
as an environment name to conflict with local usage of that same name for the Serverless Offline function ality.

`yarn log` - View (and tail) the log files from the deployed app.

`yarn test` - Run all tests

## Environment Variables

See `.env.development` and `.env.production` and the comments in
[Automatic ENV File Resolution](https://www.serverless.com/plugins/serverless-dotenv-plugin) on resolution order. Some general examples
and guidance:

- For a variable you don't want to hard-code but applies to all environments but are not "secret", like `ENABLE_SOME_FEATURE` on or off for
  all environments, put those in `.env` and commit that file to your Git repository.
- For a variable that is environment specific but still not secret, e.g. `LOG_LEVEL=debug` in development but `LOG_LEVEL=info` in
  Production, set those in `.env.development`, `.env.production`, etc. These should also be committed to GIt.
- For secret variables such as `DB_PASSWORD`, put those in `.env.development.local`, `.env.production.local`, etc. DO NOT commit these files
  to Git (they are git-ignore'd here deliberately). If you are a solo developer, just make sure they're backed up securely somewhere. If you
  are working on a team, work out some way to share them to new developers and/or as updated.

A great way to manage secrets like this is to store them in AWS Secrets Manager, Vault, or similar. I didn't include support for that in
this project because in my experience there tends to be a wide variety of backend solutions across various projects, so it would have just
been confusing / wasted.

## Testing

Jest is included as the test suite, and examples of both simple unit tests and integration tests that exercise the API itself are included.
Integration tests are supported by [Supertest](https://github.com/visionmedia/supertest).

Coverage reports will be written to `./reports/`. Both traditional code-coverage and high level summary reports for the entire test suite
are enabled. The test suite doesn't connect to the database to run these tests properly - that's a more opinionated decision than I wanted
to bake into this boilerplate. But if you want to support it, there is a `./test/setup.ts` file included to make the connection from.
