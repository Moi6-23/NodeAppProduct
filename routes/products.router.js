const express = require('express');
const { faker } = require('@faker-js/faker');
const ProductsService = require('../services/product.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');
const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(
    products
  )
})

router.get('/filter', async (req, res) => {
  res.send('Soy un filtro')
})

router.post('/create', 
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const data = req.body;
    let newProduct = await service.create({...data})
    res.status(201).json({
      message: "Creado con exito",
      data: newProduct,
    })
  }
)

router.put('/:id', 
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req,res, next)=> {
    try {
      const { id } = req.params
      const body = req.body
      console.log(body)
      await service.update(id, body);
      res.status(200).json({
            message: `update product with id ${id}`,
            data: {
                id,
                ...body
            }
      })
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id', 
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const data = req.body;
      await service.update(id, data);

      res.json({
        message: "update",
        data: data,
        id
      })
    } catch (error) {
      next(error)
    }
  }
)


router.delete('/:id', 
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    const {id} = req.params;
    let code = await service.delete1(id);
    if(code === 404){
      res.status(code).json({
        message: 'Not found'
      })
    }else{
      res.status(code).json({
          message: 'Ha sido eliminado',
          id: id
        }
      )
    }
  }
)


router.get('/:id', 
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const productFilter = await service.findOne(id);  
      res.json({...productFilter})
    } catch (error) {
      next(error)
    }
  }
)


module.exports = router;