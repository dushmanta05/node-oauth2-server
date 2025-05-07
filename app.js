import express from 'express';
import dotenv from 'dotenv';
import { Provider } from 'oidc-provider';

import connectDatabase from './config/database.js';

const app = express();

const clients = [
  {
    client_id: 'example',
    client_secret: 'secret',
    redirect_uris: ['http://localhost:3000/cb'],
    response_types: ['code'],
    grant_types: ['authorization_code'],
    scope: 'openid profile email',
  },
];

const oidc = new Provider('http://localhost:3000', {
  clients,
});
dotenv.config();

app.use('/', oidc.callback());

app.listen(process.env.PORT, async () => {
  connectDatabase();
  console.log(`Server running on port ${process.env.PORT}`);
});
