
let customer=require("./routes/customerRoutes");
let owner = require("./routes/ownerRoutes");
let rental = require("./routes/rentalReoutes");
let car = require("./routes/carRoutes");
let admin = require("./routes/adminRoutes");
module.exports=function(app){
    admin(app)
    customer(app)
    rental(app)
    car(app)
    owner(app)
}