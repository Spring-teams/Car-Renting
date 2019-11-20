
let customer=require("./routes/customerRoutes");
let owner = require("./routes/ownerRoutes");
let rental = require("./routes/rentalReoutes");
let car = require("./routes/carRoutes");
module.exports=function(app){
    let AdminCtrl = require("./api/controller/adminController");
    app.route("/api/admin/getAllCustomer").get(AdminCtrl.getAllCustomer);
    customer(app)
    rental(app)
    car(app)
    owner(app)
}