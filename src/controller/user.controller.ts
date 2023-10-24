import {Request, Response} from "express";
import logger from "../utils/logger";
import {CreateUserInput, VerifyUserInput} from "../schema/user.schema";
import {createUser, deleteAllUsers, findUser} from "../service/user.service";
import sendMail from "../utils/mailer";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);
        await sendMail({
            from: "text@example.com",
            to: user.email,
            subject: "Welcome to HeyDaw",
            text: `Verify your email ${user.verificationCode} , Id: ${user._id}`,
        });
        return res.send(user);
    } catch (e: any) {
        logger.error(e);
        return res.status(400).send(e.message);
    }
};

export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;
    try {
        const user = await findUser({_id: id});
        if (!user) return res.status(404).send('Could not find user');
        if (user.verified) return res.status(400).send('User already verified');
       if(user.verificationCode === verificationCode){
           user.verified = true;
           await user.save();
           return res.send("User Successfully verified");
       }
        return res.status(400).send('Could not verify user');
    } catch (e: any) {
        logger.error(e);
        return res.status(400).send(e.message);
    }
}

export async function deleteUserHandler(req: Request, res: Response) {
    try {
        if (await deleteAllUsers()) return res.sendStatus(200).send("All users deleted");
    } catch (e: any) {
        logger.error(e);
        return res.status(400).send(e.message);
    }
}

export async function getCurrentUser(req: Request, res: Response) {
    return res.send(res.locals.user);
}

export async function getCurrentUserApp(req: Request, res: Response) {
    return res.send(res.locals.user);
}
