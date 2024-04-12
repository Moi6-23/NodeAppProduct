const UserService = require('./user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const {config} = require('../config/config');
const nodemailer = require("nodemailer");

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

  async sendMail(email){
    const user = await service.findByEmail(email)
    if(!user){
      throw boom.unauthorized()
    }

    const transporter = nodemailer.createTransport({
      host: `${config.smtpHost}`,
      port: `${config.smtpPort}`,
      secure: true,
      auth: {
          user: `${config.smtpAcount}`,
          pass: `${config.smtpPassword}`
      }
    });

    const info = await transporter.sendMail({
      from: 'ariasmoises993@gmail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Backend Node", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    return { 
      message: 'mail sent'
    }

  }



}

module.exports = AuthService;