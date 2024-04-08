const express = require('express');
const passport = require('passport');
const OrderService = require('../services/order.service');
const router = express.Router();
const service = new OrderService();


router.get('/my-orders',
  passport.authenticate('jwt', {session:false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const dataOrders = await service.findByUser(user.sub);
      res.status(201).json(dataOrders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
