const router = require("express").Router();
const Trip = require("../models/Trip.model");

/**All Routes******/

/* landing page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//*********(D)elete Routes*********
router.post("/home/:id/delete", (req, res, next) => {
  //recieve id from user
  const { id } = req.params;
  //delete he element fromt he DB
  Trip.findByIdAndDelete(id)
    .then((data) => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
});

//****Create a trip page***** */
//POST route for *create* page
router.get("/create", (req, res) => {
  res.render("trips/create");
});
router.post("/trips/create", (req, res, next) => {
  //check info being sent from user
  const { name } = req.body;
  const { user } = req.session;
  //use that information to create a new element in our database
  Trip.create({ name, owner: user._id })
    .then((data) => {
      res.redirect(`/destination/${data._id}`);
    })
    .catch((err) => res.redirect("/total"));
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
  let { destination, flightCost } = req.body;
  let total = 0;
  if (destination == "Honolulu") {
    flightCost = 1300;
    total += flightCost;
  } else if (destination == "Tahiti") {
    flightCost = 1200;
    total += flightCost;
  } else if (destination == "Bali") {
    flightCost = 600;
    total += flightCost;
  } else if (destination == "Australia") {
    flightCost = 400;
    total += flightCost;
  } else if (destination == "California") {
    flightCost = 700;
    total += flightCost;
  } else if (destination == "Mexico") {
    flightCost = 800;
    total += flightCost;
  } else if (destination == "Canary Islands") {
    flightCost = 200;
    total += flightCost;
  } else if (destination == "Maldives") {
    flightCost = 900;
    total += flightCost;
  } else if (destination == "Thailand") {
    flightCost = 450;
    total += flightCost;
  } else if (destination == "Brazil") {
    flightCost = 300;
    total += flightCost;
  } else if (destination == "Bahamas") {
    flightCost = 550;
    total += flightCost;
  }
  //go to the DB and update destination
  Trip.findByIdAndUpdate(id, { destination, total, flightCost })
    .then((data) => {
      res.redirect(`/budget/${data._id}`);
    })
    .catch((err) => res.redirect("../views/error.hbs"));
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
    .catch((err) => res.redirect("../views/error.hbs"));
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
      res.redirect(`/luxury/${data._id}`);
    })
    .catch((err) => res.redirect("../views/error.hbs"));
});

//Get route to show *******luxury****** page after time until page
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
      res.redirect(`/car/${data._id}`);
    })
    .catch((err) => res.redirect("../views/error.hbs"));
});

//Get route to show *******car rental****** page after luxury page
router.get("/car/:id", (req, res) => {
  const { id } = req.params;
  res.render("trips/car", { id });
});

//POST route for luxury page
router.post("/car/:id", (req, res, next) => {
  const { id } = req.params;
  const { car } = req.body;

  //update the luxury level in the DB
  Trip.findByIdAndUpdate(id, { car })
    .then((data) => {
      res.redirect(`/length/${data._id}`);
    })
    .catch((err) => res.redirect("../views/error.hbs"));
});

//******Length of trip page ********
//Get route to show length of the vaction (1wk, 2wks. 3wks) after luxury page
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
      //all info from the DB, so we can display on the total page
      let total = trip.total;
      let destination = trip.destination;
      let lux = trip.luxury;
      let weeksUntilTrip = Math.ceil(
        (trip.approxDate - new Date()) / 1000 / 60 / 60 / 24 / 7
      );
      let flightCost = trip.flightCost;
      let car = trip.car * lengthInWeeks;
      //food is 280($40 a day for a week) multipied by how many weeks
      let food = 280 * lengthInWeeks;
      let saveEach = trip.saveEach;
      let oneWeek = 0;
      let hotelCost = 0;
      if (destination == "Honolulu") {
        oneWeek = 300;
      } else if (destination == "Tahiti") {
        oneWeek = 1200;
      } else if (destination == "Bali") {
        oneWeek = 800;
      } else if (destination == "Australia") {
        oneWeek = 1000;
      } else if (destination == "California") {
        oneWeek = 900;
      } else if (destination == "Mexico") {
        oneWeek = 550;
      } else if (destination == "Canary Islands") {
        oneWeek = 300;
      } else if (destination == "Maldives") {
        oneWeek = 1500;
      } else if (destination == "Thailand") {
        oneWeek = 250;
      } else if (destination == "Brazil") {
        oneWeek = 200;
      } else if (destination == "Bahamas") {
        oneWeek = 1800;
      }
      //hotel cost is the length(one week * the luxury level) multiplied by the num of weeks
      hotelCost = oneWeek * lux * lengthInWeeks;
      total = hotelCost + flightCost + car + food;
      saveEach = Math.floor(total / weeksUntilTrip);

      //update length of vacation in DB the length of the vacation and the total cost of it
      Trip.findByIdAndUpdate(id, {
        lengthInWeeks,
        total,
        saveEach,
        hotelCost,
        food,
      })
        .then((data) => {
          res.redirect(`/total/${data._id}`);
        })
        .catch((err) => res.redirect("../views/error.hbs"));
    })
    .catch((err) => {
      res.redirect("../views/error.hbs");
    });
});

//Get route to show ****** total ****** page after luxury page
router.get("/total/:id", (req, res) => {
  const { id } = req.params;
  Trip.findById(id).then((trip) => {
    res.render("trips/total.hbs", {
      id,
      total: trip.total,
      saveEach: trip.saveEach,
      budget: trip.budget,
      possible: trip.total < trip.budget,
    });
  });
});

//POST route to update total page
router.post("/total/:id", (req, res, next) => {
  const { id } = req.params;
  const { total, saveEach, budget } = req.body;
  //Updating the total and how much to save every month variable
  Trip.findById(id)
    .then((data) => {
      res.redirect(`/piechart/${data._id}`);
    })
    .catch((err) => res.redirect("../views/error.hbs"));
});

//Get route to show pichart page after total page, breaking down the expenses
router.get("/piechart/:id", (req, res) => {
  const { id } = req.params;
  const { lengthInWeeks } = req.body;
  Trip.findById(id).then((trip) => {
    res.render("trips/piechart.hbs", {
      id,
      total: trip.total,
      saveEach: trip.saveEach,
      length: trip.lengthInWeeks,
      budget: trip.budget,
      car: trip.car,
      food: trip.food,
      flight: trip.flightCost,
      hotel: trip.hotelCost,
      name: trip.name,
    });
  });
});
//POST route to update total page
router.post("/piechart/:id", (req, res, next) => {
  const { id } = req.params;
  const { total, destination, luxury } = req.body;
  Trip.findById(id)
    .then((data) => {
      res.redirect(`/home`);
    })
    .catch((err) => res.redirect("../views/error.hbs"));
});

module.exports = router;
