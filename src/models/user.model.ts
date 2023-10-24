import mongoose from "mongoose";
import bcrypt from "bcrypt";
import 'dotenv/config'
import crypto from "crypto";
function generateRandomString(length: number): string {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}
export interface UserInput {
    email: string;
    name: string;
    password: string;
    picture?: string;
    verified?: boolean;
    passwordResetCode?: string;
    verificationCode?: string;
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
    picture: {type: String},
    verificationCode: {required:true,type: String,default: () => `${generateRandomString(6)}`},
    passwordResetCode: {type: String},
    verified: {type: Boolean, default: false},


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
const UserModel = mongoose.model<UserDocument>('User', userSchema);
export default UserModel;
