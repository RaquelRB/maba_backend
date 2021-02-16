const express = require('express');
const sendToMeRouter  = express.Router();
const nodemailer = require('nodemailer')

const transport = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASSWORD,
    accessToken: process.env.ACCESSTOKEN,
  }
};

const transporter = nodemailer.createTransport(transport);
  transporter.verify((error, success) => {
    if(error) {
      console.error(error)
    } else {
      console.log('nodemailer transport success')
    }
  });

  sendToMeRouter.post('/', (req,res, next) => {

    const mail = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: req.body.email.subject,
      text: `
      from:
      ${req.body.email.name} 

      contact: ${req.body.email.email}

      message: 

      ${req.body.email.text}`
    }
 
    transporter.sendMail(mail, (err,data) => {
      if(err) {
        res.json({
          status: 'Algo ha salido mal. Por favor, inténtalo de nuevo más tarde.'
        })
      } else {
        res.json({
          status: 'Tu consulta se ha enviado correctamente.'
        })
      }
    })

  });


module.exports = sendToMeRouter;
