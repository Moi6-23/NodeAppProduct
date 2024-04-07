const jwt = require('jsonwebtoken');

const secret = 'mySecret123';
const tokenCurrent = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxMjUyMzYwN30.STUXKsGafpN9jP3oRKxkPly2A1DrRoGkknYypioLJAw';

function verifyToken(token, secret){
  return jwt.verify(token, secret)
}

const payload = verifyToken(tokenCurrent, secret);
console.log(payload)