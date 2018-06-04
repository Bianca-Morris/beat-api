const express = require('express');
const router = express.Router();

module.exports = function(passport) {
  router.post('/register', (req, res) => {
    res.json({success: true, message: 'POST /api/auth/register'});
  });

  router.get('/register', (req, res) => {
    res.json({success: true, message: 'GET /api/auth/register'});
  });

  router.get('/logout', (req, res) => {
    req.logout();
  });

  return router;
}
