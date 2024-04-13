const UserService = require('./user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const {config} = require('../config/config');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');

class AuthService {

  constructor(){}

  async getUser(email, password){
    const user = await service.findByEmail(email)
    if(!user){
      throw boom.unauthorized()
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw boom.unauthorized(), false
    }
    delete user.dataValues.password;
    return user;
  }

  async signToken(user){
    const payload = {
      sub: user.id,
      role:user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return{
      user,
      token
    }
  }

  async sendRecovery(email){
    const user = await service.findByEmail(email)
    if(!user){
      throw boom.unauthorized()
    }

    const payload = {
      sub: user.id
    }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {
      recoveryToken: token
    })

    const mail = {
      from:`${config.smtpAcount}`, 
      to: `${user.email}`, 
      subject: "Email recuperar contraseña", 
      html: `
      <b>Ingresa a este link para recuperar la contraseñá: ${link}</b>`,
    }
    const rta = await this.sendMail(mail);
    return rta
  }


  async sendMail(infoMail){
    const transporter = nodemailer.createTransport({
      host: `${config.smtpHost}`,
      port: `${config.smtpPort}`,
      secure: true,
      auth: {
          user: `${config.smtpAcount}`,
          pass: `${config.smtpPassword}`
      }
    });

    const info = await transporter.sendMail(infoMail);
    return { 
      message: 'mail sent'
    }

  }

  async changePassword(token, newPassword){
      const payload = jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
          throw boom.notAcceptable(err.name);
        }
        return decoded;
      });

      console.log(payload)
      const user = await service.findOne(payload.sub)
      if(user.recoveryToken !== token){
        boom.unauthorized()
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id,{
        password: hash,
        recoveryToken: null
      } )
      return{
        message: 'Password changed'
      }
  }



}

module.exports = AuthService;