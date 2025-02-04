const express = require('express');
const router = express.Router();
const Article = require('./../models/article');
const article = require('./../models/article');

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() });
});


router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render('articles/edit', { article: article });
});

// router.get('/new', (req, res) => {
//   res.render('articles/new');  
// });

router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article == null) {
      console.log('Article not found, redirecting to home');
      return res.redirect('/');
    }
    res.render('articles/show', { article: article });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.redirect('/');
  }
});

router.post('/',async (req, res,next) => {
  req.article = await new Article();
  next();
 
},saveArticle('new'));

router.put('/:id',async(req, res,next) => { 

  req.article = await Article.findById(req.params.id);
  next();
},saveArticle('edit'));

function saveArticle(path){
  return async (req,res)=>{
    let article = req.article;
    article.title= req.body.title, 
    article.description= req.body.description,
    article.markdown= req.body.markdown
  
  try {
    article= await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    console.error('Error saving article:', e);
    res.render(`articles/${path}`, { article: article });
  }

} 
}

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/');
});
module.exports = router; 