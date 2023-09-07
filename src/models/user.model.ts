import mongoose from "mongoose";
import bcrypt from "bcrypt";
import 'dotenv/config'

export interface UserInput {
    email: string;
    name: string;
    password: string;
    projectId?: string;
}

// Interface for User
export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;

    comparePassword(candidatePassword: string): Promise<Boolean>;
}

// Schema
const userSchema: mongoose.Schema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    projectId: {type: String},

}, {timestamps: true});

// Hash and salt password
userSchema.pre('save', async function (next) {
    let user = this as UserDocument;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
});

// Compare password and return boolean
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}
const UserModel = mongoose.model('User', userSchema);
export default UserModel;
