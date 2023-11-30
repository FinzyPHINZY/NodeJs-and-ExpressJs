const express = require("express");
const app = express();
const PORT = 8000;

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "Boluwatife Adeyemi",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "Unknown Endpoint" });
};

app.use(express.json());
// app.use(unknownEndPoint());

app.get("/", (req, res) => {
  res.send("<h1>Hello! Welcome to Boluwatife's Server</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  //code
  const output = persons.length;
  const date = new Date().toLocaleString();
  console.log(date);
  res.send("<p>Phonebook has info for " + output + " people</p> " + date);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  //   console.log(id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.send(person);
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const person = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log("listening on port:" + PORT);
});
