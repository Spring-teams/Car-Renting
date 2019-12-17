let AdminCtrl = require("../api/controller/adminController");

module.exports=function(app){

    app.route("/api/admin/confirm").post(AdminCtrl.confirm);

    app.route("/api/admin/getAllCustomer").get(AdminCtrl.getAllCustomer);

    app.route("/api/admin/getAllOwner").get(AdminCtrl.getAllOwner);

    app.route("/api/admin/checkLogin").get(AdminCtrl.checkLogin);

    app.route("/api/admin/befinite/:year").get(AdminCtrl.getbenifite);

    app.route("/api/admin/branchanalysis/:year").get(AdminCtrl.getBranchAnalysis);

    app.route("/api/admin/getanalysis/:year").get(AdminCtrl.getAnalysis);

    app.route("/api/disablecustomer").post(AdminCtrl.disableCustomer);

    app.route("/api/undisablecustomer").post(AdminCtrl.activeCustomer);

    app.route("/api/disableowner").post(AdminCtrl.disableOwner);

    app.route("/api/undisableowner").post(AdminCtrl.activeOwner)
}