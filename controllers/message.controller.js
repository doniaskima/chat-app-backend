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

const createMessage = async(senderId, receiverId, message) => {
    let info = null;
    let isNewRecipient = false;
    const user = await User.findOne({ _id: senderId }).catch((err) => {
        console.log(err);
    })
    if (user) {
        const receiver = await User.findOne({ email: receiverEmail });
        if (receiver) {
            if (!receiver.chats.includes(senderId)) {
                isNewRecipient = true;
                receiver.chats.push(senderId);
                await receiver.save();
            }
            const encryptMessage = encrypt(message);
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
}





module.exports = {
    createMessage
}