const express = require("express");
const router = express.Router();
const {
    login,
    signup,
    updateUserDetails,
    getById,
    getByEmail,
    findUser,
    deleteUser,
    deleteRecipient,
    deleteSavedMessage,
    fetchGroupsByIds,
    fetchSavedMessages,
} = require("../controllers/user.controller");
const authenticate = require("../middleware/authenticate");

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/delete_saved_message").delete(authenticate, deleteSavedMessage);
router.param("userId", findUser);
router.route("/get_by_id/:userId").get(authenticate, getById);
router.route("/get_by_email/:email").get(authenticate, getByEmail);
router.route("/groups/:userId").get(authenticate, fetchGroupsByIds);
router.route("/savedMessages/:userId").get(authenticate, fetchSavedMessages);
router.route("/update/:userId").put(authenticate, updateUserDetails);
router.route("/deleteRecipient").delete(authenticate, deleteRecipient);
router.route("/:userId").delete(authenticate, deleteUser);

module.exports = router;