// paso 1
function logError(err, req, res, next){
  console.log('logErrors')
  console.error(err)
  next(err)
}
// paso 3
function errroHandler(err, req, res, next){
  console.log('handler')
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}
// paso 2
function boomErrorHandler(err, req, res, next){
  if(err.isBoom){
    // En el output se encuentra toda la información del error de boom
    const {output} = err;
    res.status(output.statusCode).json(output.payload)
  }else{
    next(err)
  }
}

module.exports = {logError, errroHandler, boomErrorHandler}