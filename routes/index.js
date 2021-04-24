const router = require("express").Router();
// const Trip = require("../models/Trip.model");
/* GET landing page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//get route for home (profile) page
//*********Create a trip Route*********
//GET route

//after signUP page, this route goes to create a trips page
router.get("/home", (req, res) => {
  res.render("auth/home.hbs");
});
// router.get("/home", (req, res, next) => {
//   const { id } = req.params;

//   Trip.findById(id)
//     .then((data) => {
//       res.render("create.hbs", { data });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//****Create a trip page***** */
//POST route for *create* page
router.get("/create", (req, res) => {
  res.render("trips/create.hbs");
});
// router.post("/home/:id/create", (req, res, next) => {
//   //get the id
//   const { id } = req.params;

//   //get body with the elements to be edited
//   const { username, password } = req.body;

//   //go to the DB and edit the element
//   Trip.findByIdAndUpdate(id, { name })
//     .then((data) => {
//       res.redirect("/destination");
//     })
//     .catch((err) => console.log(err));
// });

// //********Destination Page***** */
// //Get route to show destination page after create page
router.get("/destination", (req, res) => {
  res.render("trips/destination.hbs");
});
// router.get("/destination", (req, res) => {
//   res.render("destination.hbs");
// });

// //POST route for destination page
// router.post("/destination/:id", (req, res, next) => {
//   //get the id
//   const { id } = req.params;

//   //get body with the elements to be edited
//   const { username, password } = req.body;
//   //go to the DB and edit the element
//   Trip.findByIdAndUpdate(id, { destination })
//     .then((data) => {
//       res.redirect("/budget");
//     })
//     .catch((err) => console.log(err));
// });

// //******budget page */
// //Get route to show budget page after destinations page
router.get("/budget", (req, res) => {
  res.render("trips/budget.hbs");
});
// router.get("/budget", (req, res) => {
//   res.render("budget.hbs");
// });
// //POST route for budget page
// router.post("/budget/:id", (req, res, next) => {
//   //get the id
//   const { id } = req.params;

//   //get body with the elements to be edited
//   const { username, password } = req.body;
//   //go to the DB and edit the element
//   Trip.findByIdAndUpdate(id, { budget })
//     .then((data) => {
//       res.redirect("/timeuntil");
//     })
//     .catch((err) => console.log(err));
// });

// //*****time until the user takes their trip page  */
// //Get route to show timeuntil page after destination page
// // this page will ask the user when do they want to take the trips
router.get("/timeuntil", (req, res) => {
  res.render("trips/timeuntil.hbs");
});
// //POST route for timeuntil page
// router.post("/timeuntil/:id", (req, res, next) => {
//   //get the id
//   const { id } = req.params;

//   //get body with the elements to be edited
//   const { username, password } = req.body;
//   //go to the DB and edit the element
//   Trip.findByIdAndUpdate(id, { approxDate })
//     .then((data) => {
//       res.redirect("/length");
//     })
//     .catch((err) => console.log(err));
// });

// //******Length of trip page ********/
// //Get route to show length of the vaction (1wk, 2wks. 3wks) after timeuntil page
// router.get("/length", (req, res) => {
//   res.render("length.hbs");
// });
// //POST route for length page
// router.post("/length/:id", (req, res, next) => {
//   //get the id
//   const { id } = req.params;

//   //get body with the elements to be edited
//   const { username, password } = req.body;
//   //go to the DB and edit the element
//   Trip.findByIdAndUpdate(id, { lengthInWeeks })
//     .then((data) => {
//       res.redirect("/luxury");
//     })
//     .catch((err) => console.log(err));
// });

// //Get route to show *******luxury****** page after length page
// //will ask the user the level of luxury they want
// router.get("/luxury", (req, res) => {
//   res.render("luxury.hbs");
// });
// //POST route for luxury page
// router.post("/luxury/:id", (req, res, next) => {
//   //get the id
//   const { id } = req.params;

//   //get body with the elements to be edited
//   const { username, password } = req.body;
//   //go to the DB and edit the element
//   Trip.findByIdAndUpdate(id, { luxury })
//     .then((data) => {
//       res.redirect("/total");
//     })
//     .catch((err) => console.log(err));
// });

// //Get route to show ****** total ****** page after luxury page
// //this page will show the user the est total cost of the trips
// router.get("/total", (req, res) => {
//   res.render("total.hbs");
// });
// //POST route for total page
// router.post("/total/:id", (req, res, next) => {
//   //get the id
//   const { id } = req.params;

//   //get body with the elements to be edited
//   const { username, password } = req.body;
//   //go to the DB and edit the element
//   Trip.findByIdAndUpdate(id, { total })
//     .then((data) => {
//       res.redirect("/piechart");
//     })
//     .catch((err) => console.log(err));
// });

// //Get route to show pichart page after total page, breaking down the expensies
// router.get("/piechart", (req, res) => {
//   res.render("trips/piechart.hbs");
// });

module.exports = router;
