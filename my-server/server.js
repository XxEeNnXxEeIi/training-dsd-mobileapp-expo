const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Register endpoint
app.post('/register', (req, res) => {
  const { userName, firstName, lastName, password } = req.body;
  // Here you can handle the registration logic, e.g., save to database
  console.log(`Received registration data: ${JSON.stringify(req.body)}`);
  res.json({ message: 'User registered successfully', userName, firstName, lastName });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { userName, password } = req.body;
  // Here you can implement your login logic, e.g., check credentials
  const user = users.find(user => user.userName === userName && user.password === password);
  if (user) {
    // Authentication successful
    res.json({ message: 'Login successful', userName });
  } else {
    // Authentication failed
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
