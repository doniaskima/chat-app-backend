//import section
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const socketio = require("socket.io");
const compression = require("compression");
const userRouter = require("./routes/user.routes");
const messageRouter = require("./routes/message.routes");
const groupRouter = require("./routes/group.route")
    //DB connection
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.on("connected", () => {
    console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
    console.log("mongodb failed with", err);
});
//import routes
app.use("/users", userRouter);
// app.use("/messages", messageRouter);
// app.use("/groups", groupRouter);
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
const server = http.createServer(app);
const io = socketio(server, { cors: true });
const connectUsers = new Map();
let groups = {};

io.on("connetion", (socket) => {
    let { id } = socket.client;

    socket.on("connectUser", ({ name }) => {
        connectUsers.set(name, [socket.client.id, socket.id]);
        io.emit("onlineUsers", Array.from(connectUsers.keys()));
    });
    socket.on("disconnect", () => {
        for (let key of connectedUser.keys()) {
            if (connectedUsers.get(key)[0] === id) {
                connectedUsers.delete(key);
                break;
            }
        }
        io.emit("onlineUsers", Array.from(connectedUsers.keys()));
    });
    socket.on("startMessage", ({ senderId, receiverEmail }) => {
        startMessage(senderId, receiverEmail);
    })
    socket.on("sendMessage", ({ sender, receiver, message }) => {
        const { email, name } = receiver;
        let receiverSocketId =
            connectedUsers.get(name) === undefined ?
            false :
            connectedUsers.get(name)[1];
        let senderSocketId = connectedUsers.get(sender.name)[1];
        createMessage(sender._id, email, message).then(
            ({ info, isNewRecipient }) => {
                if (isNewRecipient && receiverSocketId) {
                    io.to(receiverSocketId).emit("newRecipient", info);
                } else if (receiverSocketId) {
                    io.to(receiverSocketId).emit("message", info);
                }
                io.to(senderSocketId).emit("message", info);
            }
        );
    });
})

//routes middleware

const port = 8000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
console.log(`Example app listening on port ${port}`);
});