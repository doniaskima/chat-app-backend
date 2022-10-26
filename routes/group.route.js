const express = require("express");
const router = express.Router();
const {
    createGroup,

} = require("../controllers/group.controller");


router.route("/create").post(createGroup);

module.exports = router;