const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer')

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD
  }
});

router.post('/', (req, res) => {
    const { email } = req.body;
    console.log("get")
    console.log(req.body)
    transporter.sendMail({
      from: process.env.USER,
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