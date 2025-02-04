require('dotenv').config();
const express = require('express');
const Article = require('./models/article');
const methodOverride = require('method-override');
const articlesRouter = require('./routes/articles');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI);
 
app.set('view engine', 'ejs');
 
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/articles', articlesRouter);

 
app.get('/', async (req, res) => {
  const articles= await Article.find().sort({ createdAt: 'desc' });

  res.render('articles/index', { articles: articles });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
   