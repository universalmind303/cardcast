var express = require('express');
var router = express.Router();
var deckController = require('../../db/controllers/decks.js');
var helpers = require('../helpers');


router.get('/', helpers.isAuth, function(req, res, next) {
  // req has a user object given by passport
  deckController.findAll()
    .then(function(resp) {
      console.log(">>>>",resp[resp.length-1])
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
    });

});
router.get('/:id', helpers.isAuth, function(req, res) {
  deckController.findOne(req.params.id)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
    });
}); 

router.post('/', helpers.isAuth, function(req, res) {
  var deckInfo = {
    title: req.body.title
  };

  deckController.insertOne(deckInfo)
    .then(function(resp) {
      res.send(resp)
    })
    .catch(function(err) {
      console.error(err);
    });
});
router.post('/:id', helpers.isAuth, function(req, res, next) {
  deckController.deleteDeck(req.body._id)
    .then(function(resp) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });

});


module.exports = router;
