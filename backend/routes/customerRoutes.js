
module.exports=function(app){
    let customerCtrl = require("../api/controller/customerController");
    app.route("/customer").get(customerCtrl.get);
    app.route("/api/customer/confirm").post(customerCtrl.confirmUser)
    
    app.route("/api/getCurrentCustomer").get(customerCtrl.get)

    app.route("/api/updateCustomer").post(customerCtrl.updateCustomerInfo)

    
    app.route("/api/checkLogin").get(customerCtrl.checkLogin)

    app.route("/api/logout").get(customerCtrl.doLogout);

    app.route("/api/customer/checkExist/:customerId").get(customerCtrl.checkExist);

    app.route("/api/customer/insert").post(customerCtrl.insert);

    app.route("/api/getcustomer/:id").get(customerCtrl.getById);


}