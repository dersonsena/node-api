const express = require('express');

const User = require('../models/user');
const router = express.Router();

router.post('/register', async (request, response) => {
  const { email } = request.body;

  try {
    console.log('body', request.body);

    if (await User.findOne({ email })) {
      return response.status(400).send({ error: 'user already exists' });
    }

    const user = await User.create(request.body);
    user.password = undefined;

    return response.send({ user });

  } catch(err) {
    return response.status(400).send({ error: 'Registrations Failed' })
  }
});

module.exports = app => app.use('/auth', router);