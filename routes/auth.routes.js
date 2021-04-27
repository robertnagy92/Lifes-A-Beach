const router = require("express").Router();
const passport = require('passport')
const bcrypt = require("bcryptjs");
const User = require("../models/User.model")
const authorize = require("../middleware/index")


//Auth with Google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))
//Google auth callback
router.get('/google/callback/', passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => {
   res.render('auth/home')

  
})

router.get('/signup', (_, res, next) => {
  res.status(200).render('auth/signup')
});


router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render('auth/signup', { msg: 'All fields are mandatory. Please enter your username and password' })
  }

  const passwordFormatRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!passwordFormatRegex.test(password)) {
    res.status(200).render("auth/signup", { msg: "Password needs to at least 8 characters, 1 uppercase and a number" });
    return;
  }

  User
    .findOne({ username })
    .then(user => {

      const salt = bcrypt.genSaltSync(12);
      const hashPassword = bcrypt.hashSync(password, salt);

      User
        .create({ username, password: hashPassword })
        .then((newUser) => {
          req.session.user = newUser;
          res.redirect("/home");
        })
        .catch((err) => {
          console.error(`Error occured while creating: ${err}`);

          if (err.code === 11000) {
            res.status(400).render("auth/signup", {
              msg: `This username already exists, try another one`,
            });
          } else {
            res.status(500).render("auth/signup", {
              msg: "Oops, something went wrong with our server. Please try again",
            });
          }
        });
    })
    .catch((err) => {
    console.error(`Error while creating new user: ${err}`)
  })
});
router.get('/home', authorize, (req, res) => {
  const { user } = req.session.user;
  res.status(200).render("auth/home", {user});
});

router.get('/signin', (_, res) => {
  res.status(200).render('auth/signin');
});

router.post('/signin', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render('auth/signin', { msg: 'All fiels are mandatory. Please provide your username and password' })
  }
  User
    .findOne({ username })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(200).render('auth/signin', { msg: `Username doesn't exist` });
        return;
      }

      bcrypt
        .compare(password, foundUser.password)
        .then(verifiedStatus => {

          if (verifiedStatus) {
            req.session.user = foundUser;
            res.redirect('/home');
          } else {
            res.status(200).render('auth/signin', { msg: 'The password is incorrect!' });
          }

        })
        .catch((err) => {
          console.error(`Error while comparing: ${err}`);
          next();
        })
    })
    .catch((err) => {
      console.log(`Error finding: ${err}`);
      next(err);
    })
    
});


router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});


module.exports = router;
