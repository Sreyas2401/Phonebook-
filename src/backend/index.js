const express = require('express');
const { request } = require('http');
const app = express();

app.use(express.json());

let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
});

app.get('/info', (request, response) => {
  const currentTime = new Date().toLocaleString()
  response.send(`
  <p>Phonebook has info for ${people.length} people</p>
  <p>${currentTime}</p>
  `)
});

app.get('/api/people', (request, response) => {
  response.json(people)
});

app.get('/api/people/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = people.find((p) => 
    p.id === id
  )
  person ? response.json(person) : response.status(404).end()
})

app.delete('/api/people/:id', (request, response) => {
  const id = Number(request.params.id);
  people = people.filter(person => person.id !== id);
  response.status(204).end();
});


app.post('/api/people', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Name or number missing' 
    });
  }

  const maxId = people.length > 0 ? Math.max(...people.map(person => person.id)) + 1 : 1;

  const person = {
    id: maxId,
    name: body.name,
    number: body.number
  };

  people = people.concat(person);

  response.status(201).json(person);
});


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
