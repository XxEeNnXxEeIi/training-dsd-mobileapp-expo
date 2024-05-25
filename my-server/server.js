const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { userName, firstName, lastName, password, email } = req.body;
  try {
    // Create new registration
    const newMember = await prisma.member.create({
      data: {
        userName,
        firstName,
        lastName,
        password,
        email,
      },
    });

    res.status(201).json(newMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;
