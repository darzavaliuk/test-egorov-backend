const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer')

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
  
  const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
  }
  
  module.exports = allowCors(handler)

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD
  }
});

router.post('/api/product', (req, res) => {
    const { email } = req.body;
    console.log("get")
    console.log(req.body)
    transporter.sendMail({
      from: "Daria Zavaliuk",
      to: email,
      subject: 'Вы подписались на рассылку',
      text: 'Спасибо за подписку! Теперь вы будете регулярно получать новости на почту.'
    }, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Ошибка отправки письма');
      } else {
        console.log('Email успешно отправлен: ' + info.response);
        res.status(200).send('Сообщение успешно отправлено');
        console.log("new")
      }
    }
    )
  });
  

module.exports = router;