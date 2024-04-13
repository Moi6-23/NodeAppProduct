const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthService = require('../services/auth.service')
const service = new AuthService();
const validatorHandler = require('../middlewares/validator.handler');
const {changePasswordSchema, sendAuthEmailSchema} = require('../schemas/auth.schema')

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
  validatorHandler(sendAuthEmailSchema, 'body'),
  async(req, res, next) => {
    try {
      const {email} = req.body;
      const resp = await service.sendRecovery(email);
      res.json(resp)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/change-password', 
  validatorHandler(changePasswordSchema, 'body'),
  async(req, res, next) => {
    try {
      const {token, newPassword} = req.body;
      console.log(req.body)
      const rta = await service.changePassword(token, newPassword);
      res.json(rta)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router;

