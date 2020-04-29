const express = require('express');
const app = express();

app.use(express.json());

const books = [
    {id: 1, name: "comic"},
    {id: 2, name: "ilmu"},
    {id: 3, name: "majalah"},
]

// define a simple route
app.get('/', (req, res) => {
    res.send('Hello Elan!!!');
});

// define a simple route
app.get('/api/books', (req, res) => {
    res.send(books);
});

app.post('/api/books',(req, res) => {
    if (!req.body.name || req.body.name.length < 3){
        // 400 Bad request
        res.status(400).send('name is required and should be minimum 3 character');
        return;
    }
    
    const book = {
        id: books.length + 1,
        name: req.body.name
    };
    books.push(book);
    res.send(book);
});

app.get('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) res.status(404).send('The book with the given ID was not found.'); //404
    res.send(book);
});

// listen for requests port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// app.post()
// app.put()
// app.delete()