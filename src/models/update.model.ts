import mongoose from "mongoose";
const version ={
    "version": "v1.0.0",
    "notes": "Test version",
    "pub_date": "2020-06-22T19:25:57Z",
    "platforms": {
        "darwin-x86_64": {
            "signature": "Content of app.tar.gz.sig",
            "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x86_64.app.tar.gz"
        },
        "darwin-aarch64": {
            "signature": "Content of app.tar.gz.sig",
            "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-aarch64.app.tar.gz"
        },
        "linux-x86_64": {
            "signature": "Content of app.AppImage.tar.gz.sig",
            "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-amd64.AppImage.tar.gz"
        },
        "windows-x86_64": {
            "signature": "Content of app-setup.nsis.sig or app.msi.sig, depending on the chosen format",
            "url": "https://github.com/username/reponame/releases/download/v1.0.0/app-x64-setup.nsis.zip"
        }
    }
}

export interface platform {
    signature: string,
    url: string
}
export type versionDTO = {
    version: string,
    notes: string,
    pub_date: Date,
    platforms: {
        [key: string]: platform
    }
}
const updateSchema = new mongoose.Schema({
    version: {type: String, required: true},
    notes: {type: String, required: true},
    pub_date: {type: Date, required: true},
    platforms: {type: Object, required: true},
}, {timestamps: true});
const UpdateModel = mongoose.model('Update', updateSchema);
export default UpdateModel;
