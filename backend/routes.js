
module.exports=function(app){
    let customersCtrl = require("./api/controller/customerController");
    let carTrl = require("./api/controller/carController");
    let rentalCtrl = require("./api/controller/rentalController");
    let OwnerCtrl = require("./api/controller/OwnerController");
    let AdminCtrl = require("./api/controller/adminController")
    app.route("/customer").get(customersCtrl.get)
   
    app.route("/api/getallcar").get(carTrl.get);

    app.route("/api/car/checkExist/:carId").get(carTrl.checkExist);
    
    app.route("/api/customer/confirm").post(customersCtrl.confirmUser)
    
    app.route("/api/getCurrentCustomer").get(customersCtrl.get)

    app.route("/api/updateCustomer").post(customersCtrl.updateCustomerInfo)

    
    app.route("/api/checkLogin").get(customersCtrl.checkLogin)

    app.route("/api/logout").get(customersCtrl.doLogout);
    
    app.route("/api/getcarbyid/:carid").get(carTrl.getCarById);

    app.route("/api/searchCar/:branch/:category/:numberSeat").get(carTrl.searchCar);

    app.route("/api/getCarByOwnerId/:ownerId").get(carTrl.getCarByOwnerId);
    
    app.route("/api/addrental").post(rentalCtrl.addrental);
    
    app.route("/api/getrental/:customerId").get(rentalCtrl.getrental);

    app.route("/api/customer/checkExist/:customerId").get(customersCtrl.checkExist);


    app.route("/api/owner/confirm").post(OwnerCtrl.confirmOwner);

    app.route("/api/getowner").get(OwnerCtrl.curr); 

    app.route("/api/getCustomerByOwner").get(OwnerCtrl.getCustomer);


    app.route("/api/checkOwnerLogin").get(OwnerCtrl.checkLogin);

    app.route("/api/ownerLogout").get(OwnerCtrl.doLogout);

    app.route("/api/addCarByOwner").post(OwnerCtrl.addCarByOwner);

    app.route("/api/addImageCar").post(OwnerCtrl.addImageCar);

    app.route("/api/updateOwner").post(OwnerCtrl.updateOwner);

    app.route("/api/owner/checkExist/:ownerId").get(OwnerCtrl.checkExist);


    app.route("/api/admin/getAllCustomer").get(AdminCtrl.getAllCustomer);
    
}