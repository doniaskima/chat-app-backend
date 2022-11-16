const express = require("express");
const router = express.Router();
const {
    createGroup,
    updateGroup,

} = require("../controllers/group.controller");


router.route("/create").post(createGroup);
router.route("/update_group").put(updateGroup);

module.exports = router;