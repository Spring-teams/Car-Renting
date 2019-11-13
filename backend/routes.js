
module.exports=function(app){
    let customersCtrl = require("./api/controller/customerController");
    let carTrl = require("./api/controller/carController");
    let rentalCtrl = require("./api/controller/rentalController");
    let OwnerCtrl = require("./api/controller/OwnerController");
    app.route("/customer").get(customersCtrl.get)
   
    app.route("/api/getallcar").get(carTrl.get);
    
    app.route("/api/confirmuser").post(customersCtrl.confirmUser)
    
    app.route("/api/getCurrentCustomer").get(customersCtrl.get)

    app.route("/api/updateCustomer").post(customersCtrl.updateCustomerInfo)

    
    app.route("/api/checkLogin").get(customersCtrl.checkLogin)

    app.route("/api/logout").get(customersCtrl.doLogout);
    
    app.route("/api/getcarbyid/:carid").get(carTrl.getCarById);

    app.route("/api/searchCar/:branch/:category/:numberSeat").get(carTrl.searchCar);

    app.route("/api/getCarByOwnerId/:ownerId").get(carTrl.getCarByOwnerId);
    
    app.route("/api/addrental").post(rentalCtrl.addrental);
    
    app.route("/api/getrental/:customerId").get(rentalCtrl.getrental);

    app.route("/api/confirmOwner").post(OwnerCtrl.confirmOwner);

    app.route("/api/getowner").get(OwnerCtrl.curr); 

    app.route("/api/getCustomerByOwner").get(OwnerCtrl.getCustomer);

    app.route("/api/checkOwnerLogin").get(OwnerCtrl.checkLogin);

    app.route("/api/ownerLogout").get(OwnerCtrl.doLogout);

    app.route("/api/addCarByOwner").post(OwnerCtrl.addCarByOwner)

    
    
}