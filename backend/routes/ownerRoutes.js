let OwnerCtrl = require("../api/controller/OwnerController")

module.exports=function(app){
    app.route("/api/owner/confirm").post(OwnerCtrl.confirmOwner);

    app.route("/api/getowner").get(OwnerCtrl.curr); 

    app.route("/api/getCustomerByOwner").get(OwnerCtrl.getCustomer);


    app.route("/api/checkOwnerLogin").get(OwnerCtrl.checkLogin);

    app.route("/api/ownerLogout").get(OwnerCtrl.doLogout);

    app.route("/api/addCarByOwner").post(OwnerCtrl.addCarByOwner);

    app.route("/api/addImageCar").post(OwnerCtrl.addImageCar);

    app.route("/api/updateOwner").post(OwnerCtrl.updateOwner);

    app.route("/api/owner/checkExist/:ownerId").get(OwnerCtrl.checkExist);
}