const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: mongoose.Schema.Types.String,
    isPublic: mongoose.Schema.Types.Boolean,
})