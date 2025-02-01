const express = require('express');
const articlesRouter = require('./routes/articles');
const app = express();

app.set('view engine', 'ejs');
app.use('/articles', articlesRouter);
app.get('/', (req, res) => {
  const articles = [{
    title: 'Article 1',
    createdAt: new Date(),
    description: 'This is article 1'
  }, {
    title: 'Article 2',
    createdAt: new Date(),
    description: 'This is article 2'
  }];
  res.render('articles/index', { articles: articles });
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});