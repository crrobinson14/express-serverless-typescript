import {Request, Response, Router} from 'express';
import {check, checkSchema, matchedData} from 'express-validator';
import {emailIsUnique, userIdIsCaller} from '../../lib/validators';
import {sessionValid} from '../../lib/guards';
import {User} from '../../models';
import {log} from '../../lib/log';

// For a list of validation options, review https://express-validator.github.io/docs/validation-chain-api.html and
// https://github.com/validatorjs/validator.js#validators. Here we illustrate two patterns, a simple check-field style, and a more robust
// check-schema option.

export class Users {
  public readonly router: Router;

  constructor() {
    this.router = Router({mergeParams: true});

    // Get a list of all users in the system. This is just meant to illustrate typical CRUD operations but if we pretend we're a big social
    // app here we'd never allow something like this, so here we're just going to return the 10 most-recently-created. This endpoint is
    // mostly demonstrating general route handling and a guard to only allow this to be called by authenticated users.
    this.router.get('/users', sessionValid, async (_, res: Response) => {
      const newUsers = await User.findAll({attributes: User.PUBLIC_FIELDS, order: [['createdAt', 'DESC']], limit: 10, plain: true});
      res.json({users: newUsers});
    });

    // Create a user
    this.router.post('/users', check(['email']).isEmail().custom(emailIsUnique), check(['password']).isStrongPassword(), async (req: Request, res: Response) => {
      const {email, password} = matchedData(req);
      const passwordHash = User.hashPassword(password);

      const newUser = new User({email, passwordHash});
      await newUser.save();
      log.info('Created user', newUser.toJSON());

      res.json({user: newUser.toJSON()});
    });

    // Get a public user profile by their ID
    this.router.get('/users/:userId', sessionValid, check(['userId']).isUUID(), async (req: Request, res: Response) => {
      const {userId} = matchedData(req);
      const foundUser = await User.findByPk(userId, {attributes: User.PUBLIC_FIELDS});
      if (!foundUser) {
        throw new Error('Not found');
      }

      console.log('Getting user', userId);
      res.json({userId});
    });

    // Update a user record. We require a userId here to be explicit/support future expansion, but for now we only allow users to update
    // their own records. We don't need the sessionValid guard here because userIdIsCaller implicitly checks the same thing.
    this.router.put('/users/:userId', check(['userId']).custom(userIdIsCaller), checkSchema(User.MUTABLE_FIELDS), async (req: Request, res: Response) => {
      const {userId, password} = matchedData(req);

      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('Not found');
      }

      if (password) {
        log.info('Updating user password', userId);
        const passwordHash = User.hashPassword(password);
        await user.update({passwordHash});
      }

      // It seems like extra work but there are some race conditions that can be avoided by re-getting the record. This guarantees if there
      // are several writes hitting the user's record at once we always get the latest value, and our updatedAt field will be the correct,
      // DB-maintained value.
      const updatedUser = await User.findByPk(userId, {attributes: User.PRIVATE_FIELDS, plain: true});
      res.json({user: updatedUser});
    });
  }
}
