const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
//const db = mongoose.connect('mongodb://localhost/bookAPI');
if(process.env.ENV === 'Test'){
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
}else{
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}
const bodyParser = require('body-parser');
const Book = require('./models/bookModel')
const bookRouter = require('./routes/bookRouter')(Book);

app.unsubscribe(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my api');
});

app.server = app.listen(port, () => {
  console.log(`Reunning on port ${port}`);
});

module.exports = app;