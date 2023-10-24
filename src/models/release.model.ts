import mongoose from "mongoose";

export interface ReleaseInput {
    target: string;
    arch: string;
    current_version: string;
    download_url: string;
    release_date: Date;
    release_notes: string;
}

const releaseSchema: mongoose.Schema = new mongoose.Schema({
    target: {type: String, required: true},
    arch: {type: String, required: true},
    current_version: {type: String, required: true},
    download_url: {type: String, required: true},
    release_date: {type: Date, required: true},
    release_notes: {type: String, required: true},
}, {timestamps: true});
const ReleaseModel = mongoose.model('Release', releaseSchema);
export default ReleaseModel;

