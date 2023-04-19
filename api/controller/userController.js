const express = require("express");
const router = express.Router();
const db = require("../../db/db");
// 导入jwt
const jwt = require("jsonwebtoken");
const md5 = require("md5");

// bodyphase
router.use(express.json());
router.use(express.urlencoded({ extends: true }));

const userController = {
    async login(req, res) {
        try {
          let loginForm = {
            name: req.body.loginForm.username,
            password: md5(req.body.loginForm.password),
          };
          const data = await db.User.find({ ...loginForm });
          if (data.length) {
            let token = jwt.sign(
              {
                ...loginForm,
              },
              "tooyyy77",
              {
                expiresIn: 60 * 60 * 24,
              }
            );
            return res.json({
              code: "0000",
              data,
              token,
            });
          } else {
            return res.json({
              code: "1001",
              msg: "登录失败,用户名或密码不存在！",
            });
          }
        } catch (err) {
          return res.json({
            code: "1002",
            msg: "登录失败！",
          });
        }
      }
}
module.exports = userController