/**
 * Created by trungquandev.com's author on 17/08/2019.
 * routes/web.js
 */
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const multipleUploadController = require("../controllers/multipleUploadController");
const multipleUploadMiddleware = require("../middleware/multipleUploadMiddleware");

const { check } = require('express-validator');

let initRoutes = (app) => {
  // Gọi ra trang home cho việc upload
  router.get("/", homeController.getHome);
  
  // Upload nhiều file với phương thức post, test validate username với chiều dài tối thiểu là 5
  router.post(
    "/multiple-upload",
    multipleUploadMiddleware,
    [check('username', 'Min length of username is 5.').isLength({ min: 5 })],
    multipleUploadController.multipleUpload
  );

  return app.use("/", router);
};

module.exports = initRoutes;
