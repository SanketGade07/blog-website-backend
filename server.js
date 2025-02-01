const express = require('express');
const articlesRouter = require('./routes/articles');
const app = express();

app.set('view engine', 'ejs');
app.use('/articles', articlesRouter);
app.get('/', (req, res) => {
  res.render('index');
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});