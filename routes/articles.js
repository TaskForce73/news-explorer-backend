const router = require('express').Router();
const auth = require('../middleware/auth');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const {
  articlesValidation,
  articleIdValidation,
} = require('../middleware/validation');

router.get('/articles', auth, getArticles);

router.post('/articles', auth, articlesValidation, createArticle);

router.delete('/articles/:articleId', auth, articleIdValidation, deleteArticle);

module.exports = router;
