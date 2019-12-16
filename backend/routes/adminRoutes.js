let AdminCtrl = require("../api/controller/adminController");

module.exports=function(app){
    app.route("/api/admin/getAllCustomer").get(AdminCtrl.getAllCustomer);
}