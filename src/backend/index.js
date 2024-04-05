const express = require('express');
const http = require('http');


const people = {
  "persons": [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "id": 3,
      "name": "Sreyas",
      "number": "12-34-567890"
    }
  ]
}

const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(people));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

