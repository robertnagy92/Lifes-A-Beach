const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model.js");

//when user signs in store info here:, use it in profile route
let userInfo = {};

/* Signup Routes */

router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  // validate input of PW and Username
  if (!username || !password) {
    res.render("auth/signup.hbs", { msg: "Please enter all fields" });
    return;
  }

  //Validate Password:
  const passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passRe.test(password)) {
    res.render("auth/signup.hbs", {
      msg:
        "Password must be 8 characters, must have a number, and an uppercase Letter",
    });
    // tell node to come out of the callback code
    return;
  }

  // encrypt the PW, create User in db:
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  User.create({ username, password: hash })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      next("ERROOOOOR", err);
    });
});

//SignIn Routes:
router.get("/signin", (req, res, next) => {
  res.render("auth/signin.hbs");
});

router.post("/signin", (req, res, next) => {
  const { username, password } = req.body;
  // validate input of PW and Username
  User.findOne({ username })
    .then((response) => {
      // when email does not exists, response will be an null
      if (!response) {
        res.render("auth/signin.hbs", {
          msg: "Email or password seems to be incorrect",
        });
      } else {
        // 2. compare the password with bcrypt
        // response.password is the hashed password from the db
        // password is the one that the user typed in the input, we use from req.body
        bcrypt.compare(password, response.password).then((isMatching) => {
          //compare will return a true or a false
          if (isMatching) {
            req.session.userInfo = response;
            req.app.locals.isUserLoggedIn = true;
            res.redirect("/profile");
            console.log("worked");
          } else {
            res.render("auth/signin", {
              msg: "Email or password seems to be incorrect",
            });
          }
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;
