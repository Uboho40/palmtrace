const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [];

app.get('/', (req, res) => {
  res.send('markgro-palmtrace is running - USSD for palmtrace');
});

app.post('/api/register', (req, res) => {
  const { name, phone, password } = req.body;
  if (!name || !phone || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  users.push({ id: users.length + 1, name, phone });
  res.json({ message: 'Account created for markgro-palmtrace', total: users.length });
});

app.post('/ussd', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`CON Welcome to markgro-palmtrace
1. Register
2. Check price`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('markgro-palmtrace running on ' + PORT));
