import {Schema} from 'express-validator';
import {randomBytes, scryptSync} from 'crypto';
import {Table, Model, UpdatedAt, Column, CreatedAt, PrimaryKey, IsUUID, Default, DataType} from 'sequelize-typescript';

@Table
export default class User extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column
  id!: string;

  @Column
  email!: string;

  @Column
  passwordHash!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  // NOTE: This is a relatively secure but very basic hashing method. This starter template is not a guide to application security! It is strongly
  // recommend that you research password hashing methods and implement something stronger, and/or use a vendor provided service like Auth0. This
  // is just here to demonstrate static helper methods in Sequelize models.
  static hashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    return scryptSync(password, salt, 64).toString('base64');
  }

  // It's also sometimes helpful to consolidate things like attribute lists inside the model itself. I tend to do this more often than actually
  // making getter methods because it's common in bigger apps that the caller may have special logic so you end up with a lot of single-purpose
  // getters, which kind of kills the point of consolidating the methods here. Here we're listing those fields that are public, available to
  // callers retrieving a user's profile. At the moment we don't really have any public fields (email and passwordHash are definitely private!)
  // But if we added things like an avatar, nickname, screen name, etc, we'd add it here.
  static PUBLIC_FIELDS = ['id', 'createdAt'];

  static PRIVATE_FIELDS = ['id', 'createdAt', 'updatedAt', 'email'];

  // Currently we only allow users to change their passwords. If we had more fields like screen name, we'd add validation for those here.
  static MUTABLE_FIELDS: Schema = {
    password: {
      optional: true,
      isStrongPassword: {
        bail: true,
      },
    },
  };
}
