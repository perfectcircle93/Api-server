const express = require('express');
const app = express();
const uuidv4 = require('uuidv4')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 3, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 4, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  ];

app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials.filter(item => item.id == req.params.id));  
});

app.get('/testimonials/random', (req, res) => {
    const randomItem = db.testimonials[Math.floor(Math.random()*db.testimonials.length)];
    res.json(randomItem);
});

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body
    const opinion = {
        id: uuidv4(),
        author: text,
        text: text,
    };
    db.testimonials.push(opinion);
    res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
    const { author, text } = req.body;

    const changedTestimonial = {
        id: req.params.id,
        author: author,
        text: text
    }

    const opinion = db.testimonials.filter(item => item.id == req.params.id);
    const index = db.testimonials.indexOf(opinion);
    db.testimonials[index] = changedTestimonial;

    res.json({ message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {
    const opinion = db.testimonials.filter(item => item.id == req.params.id);
    const index = db.testimonials.indexOf(opinion);
    db.testimonials.splice(index, 1);

    res.json({ message: 'OK'});
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
  });

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});