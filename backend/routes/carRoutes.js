let carCtrl = require("../api/controller/carController")

module.exports=function(app){
    
    app.route("/api/getallcar").get(carCtrl.get);

    app.route("/api/car/checkExist/:carId").get(carCtrl.checkExist);
    app.route("/api/getcarbyid/:carid").get(carCtrl.getCarById);

    app.route("/api/searchCar/:branch/:category/:numberSeat").get(carCtrl.searchCar);

    app.route("/api/getCarByOwnerId/:ownerId").get(carCtrl.getCarByOwnerId);
    
}