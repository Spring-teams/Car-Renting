let rentalCtrl = require("../api/controller/rentalController");
module.exports= function(app){
    app.route("/api/addrental").post(rentalCtrl.addrental);
    
    app.route("/api/getrental/:customerId").get(rentalCtrl.getrental);

    app.route("/api/getRentalPermonth/:month/:year").get(rental.getRentalPerMonth)
}