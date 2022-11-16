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

// fetch all public Groups

const fetchAllPublicGroups = (req, res) => {

    Group.find({ isPublic: true }, "name _id description").then((groups) => {
            return res.json({ status: true, groups: groups });
        })
        .catch((err) => {
            console.log(err);
            return res.json({ status: false, message: err.message });
        });
}

const updateGroup = async(req, res) => {
    const { groupId, name, description, isPublic } = req.body;
    const group = await Group.findById(groupId);
    if (group) {
        group.name = name;
        group.description = description;
        group.isPublic = isPublic;
        await group.save();
        return res.json({ status: true, message: "group updated" });
    }
    return res.json({ status: false, message: "Invalid group Id" });
}

const removeMember = async(req, res) => {
    try {
        const { groupId, memeberId } = req.body;
        const group = await Group.findById(groupId);
        const user = await User.findById(memberId);
        let index = group.members.indexOf(memberId);
        group.members.slice(index, 1);
        index = user.groups.indexOf(groupId);
        user.groups.slice(index, 1);
        await user.save();
        await group.save();
        return res.son({ status: true, message: "member removed" });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

const deleteGroup = async(req, res) => {
    const { groupId } = req.params;
    const group = await Group.findBy(groupId);
    if (group) {
        await User.updateMany({ _id: { $in: group.members } }, { $pull: { groups: group._id } });
        await Message.deleteMany({ receiver: group._id });
        Group.deleteOne({ _id: groupId }).then(() => {
                return res.json({ status: true, message: "group deleted" });
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({ status: false, message: err.message });
            })
    }
}

module.exports = {
    createGroup,
    updateGroup,
    removeMember,
    deleteGroup,
}