import {CustomValidator} from 'express-validator';
import {User} from '../models';

// Verify that the caller is authenticated with a valid session (req.user is set and contains an ID) and it matches the parameter
export const userIdIsCaller: CustomValidator = (value: any, {req}) => {
  if (!req.user || !req.user.sub || req.user.sub !== value) {
    throw new Error('Unauthorized');
  }

  return true;
};

// Custom validators may be async, so we can do DB lookups
// See https://express-validator.github.io/docs/custom-validators-sanitizers.html
// Verify that the specified email address is not already in the database
export const emailIsUnique: CustomValidator = (email: any) =>
  User.findOne({where: {email}}).then((user) => {
    if (user) {
      throw new Error('Email address already registered');
    }

    return true;
  });
