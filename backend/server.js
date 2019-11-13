let express  =  require("express");
let app = express();
const bodyParser = require("body-parser");
let port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var publicDir = require('path').join(__dirname,'/');
app.use(express.static(publicDir));

let route = require("./routes");
route(app);
app.listen(port);
console.log("listening in "+ port);