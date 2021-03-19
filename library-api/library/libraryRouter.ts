import express from 'express';
import LibraryModel from './LibraryModel';
import AuthModel from '../auth/AuthModel';

const router = express.Router();

router.post('/create', (req, res, next) => {
  findUser(req, res, next);
}, (req, res) => {
  LibraryModel.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        res.status(403).json({error: "Email already in use"});
      }
      else {
        const newLibrary = new LibraryModel({email: req.body.email, bookList: []});
        newLibrary.save()
          .then(user => {
            res.status(200).json(user);
          })
          .catch(error => {
            res.status(500).json(error);
          });
      }
    })
});

router.get('/:user', (req, res) => {
  LibraryModel.findOne({email: req.params.user})
    .then(user => {
      if (user) res.status(200).json(user);
      else res.status(404).json({error: 'User not found'})
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.put('/add', (req, res, next) => {
  findUser(req, res, next);
}, (req, res, next) => {
  LibraryModel.findOne({email: req.body.email})
    .then(library => {
      if (library) {
        if (library.bookList.length === 0) next()
        
        library?.bookList.forEach(arr => {
          if (arr.key === req.body.book.key) {
            res.status(403).json("Book already saved")
          } else {
            next();
          }})
      } else {
        next();
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}, (req, res) => {
  LibraryModel.findOneAndUpdate(
    {email: req.body.email},
    {$push: {bookList: req.body.book}},
    {new: true, upsert: true, useFindAndModify: false}
  )
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

router.put('/remove', (req, res, next) => {
  LibraryModel.findOne({email: req.body.email})
    .then(library => {
      if (library) {
        library?.bookList.forEach(arr => {
          if (arr.key === req.body.book.key) {
            next();
          }
        })
      } else {
        res.status(404).json({error: 'Book not found'});
      }
      
    })
    .catch(error => {
      res.status(500).json(error);
    });
}, (req, res) => {
  LibraryModel.findOneAndUpdate(
  {"bookList.key": req.body.book.key},
  {$pull: {bookList: {key: req.body.book.key}}},
  {new: true, upsert: true, useFindAndModify: false})
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({error: 'User not found'});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

router.delete('/delete', (req, res) => {
  LibraryModel.findOneAndDelete(
    {email: req.body.email}, 
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
    })
});

function findUser(req:any, res:any, next:any) {
  AuthModel.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({error: 'User not found'});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
}

export default router;
