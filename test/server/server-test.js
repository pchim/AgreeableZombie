// https://www.npmjs.com/package/supertest

import { expect } from 'chai';
import request from 'supertest';
import app from '../../server.js';


describe('REST API Tests', () => {
  describe('/', () => {
    it('server should send status code 200 for GET', (done) => {
      request(app).get('/').expect(200, done);
    });
  });
});
