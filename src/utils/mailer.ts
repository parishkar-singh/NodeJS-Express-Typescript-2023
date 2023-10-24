import nodemailer, {SendMailOptions} from 'nodemailer';
import config from "config";
import logger from "./logger";

// Generated a test account for nodemailer

// const createTestCreds = async () => {
//     const creds = await nodemailer.createTestAccount();
//     console.log(creds);
// }
// createTestCreds();

const smtp = config.get<{
    user: string;
    pass: string;
    host: string;
    port: number;
    secure: boolean;
}>("smtp");

const transporter = nodemailer.createTransport({
    ...smtp,
    auth: {
        user: smtp.user,
        pass: smtp.pass
    }
})

async function sendMail(payload: SendMailOptions) {
    transporter.sendMail(payload, (err, info) => {
            if (err) {
                console.log(err, `Error sending mail`);
            }
            logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        }
    )
}


export default sendMail;
