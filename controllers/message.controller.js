const Message = require("../models/user.model");
const crypto = require("crypto");
const User = require("../models/user.model");



const encrypt = (message) => {
    // key to encrypt and decrypted  (random 32 Bytes)
    const key = crypto.randomBytes(32);
    //iv - initialization vector (random 16 Bytes)
    const iv = crypto.randomBytes(16);
    // cipher function to encrypt the message
    // aes-256-cbc algorithm to encrypt and decrypt the data.
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
    let encryptedMessage = cipher.update(message);
    encryptedMessage = Buffer.concat([encryptedMessage, cipher.final()]);
    return {
        iv: iv.toString("hex"),
        encryptedMessage: encryptedMessage.toString("hex"),
        key: key.toString("hex"),
    };
};


const createMessage = async(senderId, receiverEmail, message) => {
    let info = null;
    let isNewRecipient = false;
    const user = await User.findOne({ _id: senderId }).catch((err) => {
        console.log(err);
    });
    if (user) {
        const receiver = await User.findOne({ email: receiverEmail });
        if (receiver) {
            if (!receiver.chats.includes(senderId)) {
                isNewRecipient = true;
                receiver.chats.push(senderId);
                await receiver.save();
            }
            const encryptedMessage = encrypt(message);
            const newMessage = new Message({
                sender: senderId,
                receiver: receiver._id,
                message: encryptedMessage.encryptedMessage,
                iv: encryptedMessage.iv,
                key: encryptedMessage.key,
            });
            await newMessage.save();
            info = {
                sender: { name: user.name, email: user.email, _id: user._id },
                receiver: {
                    name: receiver.name,
                    _id: receiver._id,
                    email: receiver.email,
                },
                iv: newMessage.iv,
                key: newMessage.key,
                message: newMessage.message,
                createdAt: message.createdAt,
                messageId: newMessage._id,
            };
        }
    }
    return { info, isNewRecipient };
};


const createGroupMessage = async(senderId, groupId, message) => {
    let info = null;
    const user = await User.findOne({ _id: senderId }).catch((err) => {
        console.log(err);
    });
    if (user) {
        const group = await Group.findOne({ _id: groupId });
        if (group) {
            const encryptedMessage = encrypt(message);
            const newMessage = new Message({
                sender: senderId,
                receiver: group._id,
                message: encryptedMessage.encryptedMessage,
                iv: encryptedMessage.iv,
                key: encryptedMessage.key,
            });
            await newMessage.save();
            info = {
                sender: { name: user.name, email: user.email, _id: user._id },
                iv: newMessage.iv,
                key: newMessage.key,
                message: newMessage.message,
                createdAt: message.createdAt,
                messageId: newMessage._id,
            };
        }
    }
    return info;
}

const startMessage = async(senderId, receiverEmail) => {
    const user = await User.findOne({ _id: senderId });
    if (user) {
        const receiver = await User.findOne({ email: receiverEmail });
        if (receiver) {
            if (!user.chats.includes(senderId) && user._id !== receiver._id) {
                user.chats.push(receiver._id);
                await user.save()
                    .then(() => {
                        return true;
                    })
                    .catch(() => {
                        return null;
                    });
            } else {
                return null;
            }
        }
    } else {
        return null;
    }
}

const deleteMessageById = (req, res) => {
    const { messageId } = req.params;
    Message.findByIdAndDelete(messageId)
        .then(() => {
            return res.json({ status: true, message: "message deleted" });
        })
        .catch((err) => {
            console.log(err);
            return res.json({ status: false, message: err.message });
        });
};

const deleteMessages = (sendeId, receiverId) => {
    Message.deleteMany({ sender: senderId, receiver: receiverId })
        .then(() => {
            const boolResult = Message.deleteMany({
                    receiver: sendeId,
                    sender: receiverId,
                })
                .then(() => {
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                });
            return boolResult;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
};

const getGroupMessages = (req, res) => {
    const { userId, groupId } = req.body;
    User.findOne({ _id: userId }, (err, user) => {
        if (err) {
            return res.json({ status: false, message: err.message });
        }
        if (!user) {
            return res.json({ status: false, message: "user not found" });
        }
        Group.findById(groupId, (err, group) => {
            if (err) {
                return res.json({ status: false, message: err.message });
            }
            if (!group) {
                return res.json({ status: false, message: "group not found" })
            }
            Message.find({ receiver: group._id })
                .then(async(messages) => {
                    //now , for each msg find out the sender
                    let result = [];
                    for (const msg of messages) {
                        if (String(msg.sender) !== String(user._id)) {
                            result.push({
                                sender: { id: _user, name: _user.name },
                                iv: msg.iv,
                                key: msg.key,
                                message: msg.message,
                                createAt: msg.createdAt,
                                messageId: msg._id,
                            });
                        } else {
                            result.push({
                                sender: { id: user._id, name: user.name },
                                iv: msg.iv,
                                key: msg.key,
                                message: msg.message,
                                cratedAt: msg.cratedAt,
                                message: msg._id,
                            });
                        }
                    }
                    return res.json({ status: true, message: result })
                })
                .catch((err) => {
                    return res.json({ status: false, message: err.message });
                });
        });
    });
};


module.exports = {
    createMessage,
    deleteMessages,
    encrypt,
    getMessages,
};
encrypt,
getMessages,
};