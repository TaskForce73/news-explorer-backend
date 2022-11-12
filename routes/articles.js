const router = require('express').Router();

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const {
  articlesValidation,
  articleIdValidation,
} = require('../middleware/validation');

router.get('/articles', getArticles);

router.post('/articles', articlesValidation, createArticle);

router.delete('/articles/:articleId', articleIdValidation, deleteArticle);

module.exports = router;
