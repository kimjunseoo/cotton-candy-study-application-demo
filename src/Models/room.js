import mongoose, { mongo } from "mongoose";

const roomSchema = new mongoose.Schema({
    inviteCode: { type: String, require: true},
    members: [{ type: String }],
    createdAt: { type: Date, required: true, default: Date.now },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;