const express = require('express');
const routerApi = require('./routes')
const {logError, errroHandler, boomErrorHandler} = require('./middlewares/error.handler')
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());

// const whiteList = [
//   'http://127.0.0.1:5500',
// ]

// const options = {
//   origin: (origin, callback) => {
//     if(whiteList.includes(origin)){
//       callback(null, true);
//     }else{
//       callback(new Error('Domain not allowed'))
//     }
//   } 
// }

app.use(cors())


app.listen(port, () => {
  console.log('app node on port: '+port);
})

routerApi(app);
app.use(logError);
app.use(boomErrorHandler);
app.use(errroHandler);