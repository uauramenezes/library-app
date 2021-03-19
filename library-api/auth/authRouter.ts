import bcrypt from 'bcrypt';
import express from 'express';
import AuthModel from './AuthModel';

const router = express.Router();
const salt = 10;

router.post('/sign-in', (req, res) => {
  AuthModel.findOne({email: req.body.email})
    .then(user => {
      if(!user) {
        res.status(404).json({error: 'Email not found'});
      }
      else {
        bcrypt.compare(req.body.password, user.password, (error, match) => {
          if (error) res.status(500).json(error);
          else if (match) res.status(200).json(user);
          else res.status(403).json({error: 'Incorrect password'});
        })
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

router.post('/sign-up', (req, res) => {
  bcrypt.hash(req.body.password, salt, (error, hash) => {
    if (error) res.status(500).json(error);
    else {
      AuthModel.findOne({email: req.body.email})
        .then(user => {
          if (user) {
            res.status(403).json({error: "Email already in use"});
          }
          else {
            const newUser = new AuthModel({email: req.body.email, password: hash});
            newUser.save()
              .then(user => {
                res.status(200).json(user);
              })
              .catch(error => {
                res.status(500).json(error);
              });
          }
        })
    }
  })
});

router.put('/update', (req, res) => {
  bcrypt.hash(req.body.password, salt, (error, hash) => {
    if (error) res.status(500).json(error);
    else {
      AuthModel.findOneAndUpdate(
        {email: req.body.email}, 
        {password: hash},
        {useFindAndModify: false}
      )
        .then(user => {
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({error: 'Email not found'});
          }
        })
        .catch(error => {
          res.status(500).json(error);
        });
    }
  })
})

router.delete('/delete', (req, res) => {
  AuthModel.findOneAndDelete({email: req.body.email})
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({error: 'Email not found'});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

export default router;
