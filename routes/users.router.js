const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const {limit, offset} = req.query;
  console.log(limit)
  if(limit && offset){
    res.json({
      limit,
      offset
    })
  }else{
    res.json('No hay parametros')
  }
})

module.exports = router
