const router = require('express').Router();
const auth = require('../middleware/auth');

const {
  getArticles,
  deleteArticle,
  searchArticles,
  getSavedArticles,
} = require('../controllers/articles');

const {
  articleIdValidation, articlesValidation,
} = require('../middleware/validation');

router.get('/articles', auth, getArticles);

router.post('/articles/saved-news', auth, articlesValidation, getSavedArticles);

router.post('/articles/everything', searchArticles);

router.delete('/articles/:articleId', auth, articleIdValidation, deleteArticle);

module.exports = router;
