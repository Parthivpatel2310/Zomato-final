"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _connection = _interopRequireDefault(require("./Database/connection"));
var _auth = _interopRequireDefault(require("./API/auth"));
var _passport = _interopRequireDefault(require("passport"));
var _config = _interopRequireDefault(require("./config/config"));
var _google = _interopRequireDefault(require("./config/google"));
var _Food = _interopRequireDefault(require("./API/Food"));
var _Restaurant = _interopRequireDefault(require("./API/Restaurant"));
var _User = _interopRequireDefault(require("./API/User"));
var _Menu = _interopRequireDefault(require("./API/Menu"));
var _Order = _interopRequireDefault(require("./API/Order"));
var _Review = _interopRequireDefault(require("./API/Review"));
var _Image = _interopRequireDefault(require("./API/Image"));
var _expressSession = _interopRequireDefault(require("express-session"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const zomato = (0, _express.default)();
zomato.use((0, _expressSession.default)({
  secret: '23102003'
}));
const PORT = 1112;
(0, _config.default)(_passport.default);
(0, _google.default)(_passport.default);
zomato.use(_express.default.json());
zomato.use(_passport.default.initialize());
zomato.use((0, _expressSession.default)({
  secret: process.env.JWTSECRET
}));
zomato.use(_passport.default.session());
zomato.get("/", (req, res) => {
  res.json({
    massage: "server is running..."
  });
});
zomato.use("/auth", _auth.default);
zomato.use("/food", _Food.default);
zomato.use("/restaurant", _Restaurant.default);
zomato.use("/user", _User.default);
zomato.use("/menu", _Menu.default);
zomato.use("/order", _Order.default);
zomato.use("/review", _Review.default);
zomato.use("/image", _Image.default);
zomato.listen(PORT, () => {
  (0, _connection.default)().then(() => {
    console.log("server is running....");
  }).catch(error => {
    console.log("database connetion failed");
    console.log(error);
  });
  //console.log("server is running");
});