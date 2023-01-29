"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _connection = _interopRequireDefault(require("./Database/connection"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const zomato = (0, _express.default)();
const PORT = 2003;
zomato.use(_express.default.json());
zomato.get("/", (req, res) => {
  res.json({
    massage: "server is running"
  });
});
zomato.listen(PORT, () => {
  (0, _connection.default)().then(() => {
    console.log("server is running");
  }).catch(error => {
    console.log("database connetion failed");
    console.log(error);
  });
  //console.log("server is running");
});