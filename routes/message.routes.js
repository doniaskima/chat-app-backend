const express = require("express");
const router = express.Router();

const { deleteMessageById, } = require("../controllers/message.controller");

router.route("/:messageId").delete(deleteMessageById);