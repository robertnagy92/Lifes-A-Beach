const router = require("express").Router();
const Trip = require("../models/Trip.model");

/**All Routes******/

/* landing page */
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
    .catch((err) => res.render("../public/images/404.jpeg"));
});

//********Destination Page********* */
//page after create page
router.get("/destination/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/destination", { id });
});
//POST route for destination page
router.post("/destination/:id", (req, res, next) => {
  //get the information for DB
  const { id } = req.params;
  const { destination } = req.body;
  let total = 0;
  if (destination == "Honolulu") {
    total += 1000;
  } else if (destination == "Tahiti") {
    total += 1500;
  } else if (destination == "Bali") {
    total += 2000;
  } else if (destination == "Australia") {
    total += 2000;
  } else if (destination == "California") {
    total += 1200;
  } else if (destination == "Mexico") {
    total += 1400;
  }
  //go to the DB and update destination
  Trip.findByIdAndUpdate(id, { destination, total })
    .then((data) => {
      res.redirect(`/budget/${data._id}`);
    })
    .catch((err) => console.log(err));
});

//******budget page ******/
//Get route to show budget page after destinations page
router.get("/budget/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/budget", { id });
});
//POST route for destination page
router.post("/budget/:id", (req, res, next) => {
  //get the information for DB
  const { id } = req.params;
  const { budget } = req.body;

  //Update budget in DB
  Trip.findByIdAndUpdate(id, { budget })
    .then((data) => {
      res.redirect(`/timeuntil/${data._id}`);
    })
    .catch((err) => console.log(err));
});

//********time until the trip page**********/
//Route to show timeuntil trip page after destination page
router.get("/timeuntil/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/timeuntil", { id });
});

//POST route for timeuntil page
router.post("/timeuntil/:id", (req, res, next) => {
  const { id } = req.params;
  const { approxDate } = req.body;

  //go to the DB and edit the element
  Trip.findByIdAndUpdate(id, { approxDate })
    .then((data) => {
      console.log(" date added");
      res.redirect(`/length/${data._id}`);
    })
    .catch((err) => console.log(err));
});

//******Length of trip page ********
//Get route to show length of the vaction (1wk, 2wks. 3wks) after timeuntil page
router.get("/length/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/length", { id });
});

//POST route for length page
router.post("/length/:id", (req, res, next) => {
  const { id } = req.params;
  const { lengthInWeeks } = req.body;

  //find Id for trip, one week stay at each destination multiplied by how long the vacation is
  Trip.findById(id)
    .then((trip) => {
      let total = trip.total;
      let destination = trip.destination;
      let oneWeek = 0;
      let hotelCost = 0;
      if (destination == "Honolulu") {
        oneWeek = 500;
      } else if (destination == "Tahiti") {
        oneWeek = 500;
      } else if (destination == "Bali") {
        oneWeek = 500;
      } else if (destination == "Australia") {
        oneWeek = 500;
      } else if (destination == "California") {
        oneWeek = 500;
      } else if (destination == "Mexico") {
        oneWeek = 500;
      }
      hotelCost = oneWeek * lengthInWeeks;
      total += hotelCost;
      console.log(total, hotelCost);
      //update length of vacation in DB the length of the vacation and the total cost of it
      Trip.findByIdAndUpdate(id, { lengthInWeeks, total })
        .then((data) => {
          res.redirect(`/luxury/${data._id}`);
        })
        .catch((err) => console.log(err));
    })

    .catch((err) => {
      console.log(err);
    });
});

//Get route to show *******luxury****** page after length page
router.get("/luxury/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/luxury", { id });
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

//Get route to show ****** total ****** page after luxury page
router.get("/total/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/total.hbs", { id });
});

//POST route to update total page
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

//Get route to show pichart page after total page, breaking down the expensies
router.get("/piechart/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/piechart.hbs", { id });
});
//POST route to update total page
router.post("/piechart/:id", (req, res, next) => {
  const { id } = req.params;
  const { total } = req.body;

  //update the total in the DB
  Trip.findByIdAndUpdate(id, { total })
    .then((data) => {
      res.redirect(`/home`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
