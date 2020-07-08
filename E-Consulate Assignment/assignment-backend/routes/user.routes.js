const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const User = require('../models/user.model');
users.use(cors());

var config = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 25,
  auth: {
      user: 'mahen.2017441@iit.ac.lk',
      pass: 'LOGOUTAFTERURDONE'
  }
};

var transporter = nodemailer.createTransport(config);

var defaultMail = {
  from: 'Me <mahen.2017441@iit.ac.lk>',
  text: 'test text',
};

process.env.SECRET_KEY = 'secret';

users.post('/register', (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          newUser.password = hash;
          User.create(newUser)
            .then(user => {
                mail = _.merge({}, defaultMail, mail);
                transporter.sendMail(mail, function(error, info){
                    if(error) return console.log(error);
                    console.log('mail sent:', info.response);
                });
              res.json({ status: user.email + ' has been succesfully registered' });
            })
            .catch(err => {
              res.send('error: ' + err);
            });
        });
      } else {
        res.json({ error: 'Email is already registered' });
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    });
});

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          var token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        }else {
            res.status(400).json({ error: 'Wrong Password, please retype' });
          }
      } else {
        res.status(400).json({ error: 'Email does not exist, recheck email address' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send('Email does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    });
});

module.exports = users;