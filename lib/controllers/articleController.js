'use strict';

var Article = require('../models/Article');

function getArticles(req, res, next) {
  Article.find()
    .then((article) => res.json(article))
    .catch(next);
}

function createArticle(req, res, next) {
  Promise.resolve(Article.create(req.body.article))
    .then((article) => res.json(article))
    .catch(next);
}

module.exports = {
  getArticles: getArticles,
  createArticle: createArticle,
};