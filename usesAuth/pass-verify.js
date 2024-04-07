const bcrypt = require('bcrypt');

async function verifyPassword(){
  let hashCurrent = '$2b$10$7QZj4dUkb8XRdmk4ohsnb.zwbG1MpW/rssWlRzy/KEwTNRSTUxq7q';
  const myPassword = 'admin 123 .202';
  const isMatch = await bcrypt.compare(myPassword, hashCurrent);
  console.log(isMatch)
}

verifyPassword();