
const jwt = require("jsonwebtoken");
const KEY = "tooyyy77"
module.exports = checkTokenMiddleware = (req, res, next) => {
    if(req.url!='/login'){
    let token = req.headers.authorization;
    if (token) {
      jwt.verify(token, KEY, (err, data) => {
        if (err) {
          return res.json({
            code: "1003",
            msg: "Token校验失败,请重新登录！",
          });
        }
        next()
      });
    }
    }
    else{
      next()
    }
  };