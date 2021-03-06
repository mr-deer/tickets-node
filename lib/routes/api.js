'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

var auth = require('../controllers/authController');
var article = require('../controllers/articleController');
var user = require('../controllers/userController');
const ticket = require('../controllers/ticketController');
const bus = require('../controllers/busController');

router.get('/', (req, res) => {
  res.send('Welcome to Tickets.by on AWS');
});

router.get('/protected', auth.ensureAuthenticated, (req, res) => {
  res.json({message: 'Have access'});
});

router.post('/signin', passport.authenticate('local-signin'), auth.getUser);
router.get('/logout', auth.logout);
router.get('/isLogged', auth.ensureAuthenticated, auth.getUser);

router.post('/users', user.createUser);
router.get('/users', user.getUsers);
router.delete('/users/:id', user.removeUser);

router.get('/tickets', auth.ensureAuthenticated, ticket.getTickets);
router.post('/tickets', auth.ensureAuthenticated, ticket.createTicket);
router.delete('/tickets/:id', auth.ensureAuthenticated, ticket.removeTicket);

router.get('/buses', bus.getBuses);
router.get('/buses/:id', bus.getBus);
router.post('/buses', bus.createBus);
router.delete('/buses/:id', bus.removeBus);

router.get('/articles', article.getArticles);
router.post('/articles', article.createArticle);
router.delete('/articles/:id', article.removeArticle);

module.exports = router;
