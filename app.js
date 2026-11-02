import express from 'express';
const hostname = '127.0.0.1';
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

const cats = [
  {
    id: 1,
    name: 'Whiskers',
    birthdate: 13,
    weight: 4.5,
    owner: 'Alice',
    image: 'https://placecats.com/300/200',
  },
  {
    id: 2,
    name: 'Fluffy',
    birthdate: 12,
    weight: 5.2,
    owner: 'Bob',
    image: 'https://placecats.com/300/200',
  },
  {
    id: 3,
    name: 'Mittens',
    birthdate: 11,
    weight: 3.8,
    owner: 'Charlie',
    image: 'https://placecats.com/300/200',
  },
];

app.get('/api/v1/cats', (req, res) => {
  res.json(cats);
});

// property name (id) is set in the route definition
app.get('/api/v1/cats/:id', (req, res) => {
  const catid = Number(req.params.id);
  const cat = cats.find((cat) => cat.id === catid);
  if (cat) {
    res.json(cat);
  } else {
    res.status(404).send('Cat not found');
  }
});

app.post('/api/v1/cats', (req, res) => {
  console.log(req.body);
  res.status(201).send('Cat created');
});
