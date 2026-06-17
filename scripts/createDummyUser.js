import 'dotenv/config';

import { createUser } from '../src/controllers/auth.controller.js';

const dummyUser = {
  name: 'Test User',
  email: 'testuser@example.com',
  password: 'password123',
  role: 'user',
};

try {
  const user = await createUser(dummyUser);
  console.log('Dummy user created:', user);
} catch (error) {
  if (error.statusCode === 409) {
    console.log('User already exists:', error.message);
  } else {
    console.error('Failed to create user:', error.message);
  }
}