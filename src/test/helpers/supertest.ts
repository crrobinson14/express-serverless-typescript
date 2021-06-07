import SuperTest from 'supertest';
import {app} from '../../app';

export const supertest = SuperTest(app);
