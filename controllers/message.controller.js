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

const deleteMessages = (senderId, receiverId) => {
    Message.deleteMany({ sender: senderId, receiver: receiverId })
        .then(() => {
            const boolResult = Message.deleteMany({
                    receiver: senderId,
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


module.exports = {
    createMessage,
    startMessage,
    deleteMessageById,
    deleteMessages
}