const router = require("express").Router();
const Trip = require("../models/Trip.model");
//Do all our todo routes

/* GET landing page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//****Create a trip page***** */
//POST route for *create* page
router.get("/create", (req, res) => {
  res.render("trips/create");
});
router.post("/trips/create", (req, res, next) => {
  //check info being sent from user
  const { name } = req.body;

  //use that information to create a new element in our database
  Trip.create({ name })
    .then((data) => {
      console.log("trip create");
      res.redirect(`/destination/${data._id}`);
    })
    .catch((err) => console.log(err));
});

//********Destination Page********* */
//Get route to show destination page after create page
router.get("/destination/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/destination", { id });
});

//POST route for destination page
router.post("/destination/:id", (req, res, next) => {
  //get the id
  const { id } = req.params;
  const { destination } = req.body;

  //go to the DB and edit the element
  Trip.findByIdAndUpdate(id, { destination })
    .then((data) => {
      console.log("destination choosen");
      res.redirect(`/budget/${data._id}`);
    })
    .catch((err) => console.log(err));
});

// //******budget page */
// //Get route to show budget page after destinations page
router.get("/budget/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/budget", { id });
});

//POST route for destination page
router.post("/budget/:id", (req, res, next) => {
  //get the id
  const { id } = req.params;
  const { budget } = req.body;

  //go to the DB and edit the element
  Trip.findByIdAndUpdate(id, { budget })
    .then((data) => {
      console.log("budget logged");
      res.redirect(`/timeuntil/${data._id}`);
    })
    .catch((err) => console.log(err));
});

// //*****time until the user takes their trip page  */
router.get("/timeuntil/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/timeuntil.hbs", { id });
});

//POST route for timeuntil page
router.post("/timeuntil/:id", (req, res, next) => {
  const { id } = req.params;
  const { timeuntil } = req.body;

  //go to the DB and edit the element
  Trip.findByIdAndUpdate(id, { approxDate })
    .then((data) => {
      res.redirect(`/length/${data._id}`);
    })
    .catch((err) => console.log(err));
});

// //******Length of trip page ********/
// //Get route to show length of the vaction (1wk, 2wks. 3wks) after timeuntil page
router.get("/length/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/length.hbs");
});

//POST route for length page
router.post("/length/:id", (req, res, next) => {
  const { id } = req.params;
  const { length } = req.body;

  //update length of vacation in DB
  Trip.findByIdAndUpdate(id, { lengthInWeeks })
    .then((data) => {
      res.redirect(`/luxury/${data._id}`);
    })
    .catch((err) => console.log(err));
});

// //Get route to show *******luxury****** page after length page
// //will ask the user the level of luxury they want
router.get("/luxury/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/luxury.hbs");
});

//POST route for luxury page
router.post("/luxury/:id", (req, res, next) => {
  const { id } = req.params;
  const { luxury } = req.body;

  //update the luxury level in the DB
  Trip.findByIdAndUpdate(id, { luxury })
    .then((data) => {
      res.redirect(`/total/${data._id}`);
    })
    .catch((err) => console.log(err));
});

// //Get route to show ****** total ****** page after luxury page
// //this page will show the user the est total cost of the trips
router.get("/total/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/total.hbs");
});

//POST route for total page
router.post("/total/:id", (req, res, next) => {
  const { id } = req.params;
  const { total } = req.body;

  //update the total in the DB
  Trip.findByIdAndUpdate(id, { total })
    .then((data) => {
      res.redirect(`/piechart/${data._id}`);
    })
    .catch((err) => console.log(err));
});

// //Get route to show pichart page after total page, breaking down the expensies
// router.get("/piechart", (req, res) => {
//   res.render("trips/piechart.hbs");
// });

module.exports = router;
