const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//get route to show the sign IN form
router.get("/signin", (req, res) => {
  res.render("lab/signin.hbs");
});

//get route to show the sign UP form
router.get("/signup", (req, res) => {
  res.render("lab/signup.hbs");
});

//get route for login page to view your planned vacations
router.get("/yourtips", (req, res) => {
  res.render("lab/yourtrips.hbs");
});

//after signUP page, this route goes to create a trip page
router.get("/create", (req, res) => {
  res.render("lab/create.hbs");
});

//Get route to show destination page after create page
router.get("/destination", (req, res) => {
  res.render("lab/destination.hbs");
});

//Get route to show budget page after destinations page
router.get("/budget", (req, res) => {
  res.render("lab/budget.hbs");
});

//Get route to show timeuntil page after destination page
// this page will ask the user when do they want to take the trip
router.get("/timeuntil", (req, res) => {
  res.render("lab/timeuntil.hbs");
});

//Get route to show length of the vaction (1wk, 2wks. 3wks) after timeuntil page
router.get("/length", (req, res) => {
  res.render("lab/length.hbs");
});

//Get route to show luxury page after length page
//will ask the user the level of luxury they want
router.get("/luxury", (req, res) => {
  res.render("lab/luxury.hbs");
});

//Get route to show total page after luxury page
//this page will show the user the est total cost of the trip
router.get("/total", (req, res) => {
  res.render("lab/total.hbs");
});

//Get route to show pichart page after total page, breaking down the expensies
router.get("/piechart", (req, res) => {
  res.render("lab/piechart.hbs");
});

module.exports = router;
