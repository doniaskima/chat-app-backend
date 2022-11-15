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

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/delete_saved_message").delete(deleteSavedMessage);
router.param("userId", findUser);
router.route("/get_by_id").get(getById);
router.route("/get_by_email/:email").get(getByEmail);
router.route("/groups/userId").get(fetchGroupsByIds);
router.route("/savedMessages/:userId").get(fetchSavedMessages);
router.route("/update/:userId").put(updateUserDetails);
router.route("/deleteRecipient").delete(deleteRecipient);
router.route("/:userId").delete(deleteUser);


module.exports = router;