const Group = require("../models/group.model");
const Message = require("../models/message.model");
const User = require("../models/user.model");

const randomCode = () => Math.floor(Math.random() * (1000 - 1) + 1);


// Create Group

const createGroup = async(req, res) => {
    const { adminId, groupName, isPublic, description } = req.body;
    const user = await User.findById(adminId);
    //the admin gonna create a group
    if (user) {
        const newGroup = new Group({
            name: groupName,
            admin: adminId,
            groupCode: randomCode(),
            isPublic: isPublic(),
            description: description,
        })
        newGroup.members.push(user._id);
        const groupInfo = await newGroup.save();
        user.groups.push(groupInfo._id);
        await user.save();
        return res.json({
            status: true,
            message: "Group created",
            group: grouInfo,
        })
    }
    return res.json({ status: false, message: "user not found" });
}


module.exports = {
    createGroup,
    fetchAllPublicGroups
}