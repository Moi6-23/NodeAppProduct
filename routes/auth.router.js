const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthService = require('../services/auth.service')
const service = new AuthService();

router.post('/login',
  passport.authenticate('local', {session:false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const dataLogin = await service.signToken(user);
      res.json(dataLogin)
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery', 
  async(req, res, next) => {
    try {
      const {email} = req.body;
      const resp = await service.sendMail(email);
      res.json(resp)
    } catch (error) {
      next(error)
    }

  }
)

module.exports = router;

