import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    showInvestors: { type: Boolean, default: true }
})

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    ImageLink: String,
    connectedAccountId: String,
    settings: {
        type: settingsSchema,
        default: () => ({ showInvestors: true }) // Set proper default here
    }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
