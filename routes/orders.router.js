const express = require('express');
const {getCustomerSchema, createOrderSchema, addItemSchema} = require('../schemas/order.schema');
const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const router = express.Router();
const service = new OrderService();

router.post('/create',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async(req, res, next) => {
    try {
      const {id} = req.params;
      const getData = await service.findOne(id);
      res.status(201).json(getData)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.addItem(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
