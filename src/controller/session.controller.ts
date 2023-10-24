import {CookieOptions, Request, Response} from "express";
import {createSession, findSessions, updateSession} from "../service/session.service";
import config from "config";
import {signJWT} from "../utils/jwt.utils";
import {findAndUpdateUser, getGoogleOauthTokens, getGoogleUser, validatePassword} from "../service/user.service";

const accessTokenCookieOptions: CookieOptions = {
    maxAge: 900000,
    httpOnly: true,
    domain: config.get<string>('domain'),
    path: '/',
    sameSite: 'strict' as const,
    secure: false
}
const refreshTokenCookieOptions: CookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10,

}

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(
        req.body
    )
    if (!user) return res.status(401).send("Invalid username or password");

    // Create Session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // Create Access Token
    const accessToken = signJWT(
        {...user, session: session._id},
        {expiresIn: config.get<string>('accessTokenTtl')}// Lives around 69 minutes
    );

    // Create Refresh Token
    const refreshToken = signJWT(
        {...user, session: session._id},
        {expiresIn: config.get<string>('refreshTokenTtl')}
    );
    res.cookie("accessToken", accessToken, accessTokenCookieOptions)
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
    return res.send({accessToken, refreshToken});

}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    const sessions = await findSessions({user: userId, valid: true});
    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;
    await updateSession({_id: sessionId}, {valid: false});

    // Clear the cookies by setting them to null values
    res.cookie("accessToken", null, accessTokenCookieOptions);
    res.cookie("refreshToken", null, refreshTokenCookieOptions);

    return res.send({
        accessToken: null,
        refreshToken: null,
    })
}


export async function googleOAuthHandler(req: Request, res: Response) {
    const code = req.query.code as string;
    try {
        const {id_token, access_token} = await getGoogleOauthTokens({code});
        const googleUser = await getGoogleUser({id_token, access_token});
        // console.log(id_token, access_token, googleUser);
        if (!googleUser) return res.status(403).send("Google account is not verified");
        const user = await findAndUpdateUser({email: googleUser.email}, {
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture
        }, {upsert: true, new: true});
        if (!user) return res.status(401).send("Invalid username ");
        const session = await createSession(user._id, req.get("user-agent") || "");

        const accessToken = signJWT(
            {...user, session: session._id},
            {expiresIn: config.get<string>('accessTokenTtl')}// Lives around 69 minutes
        );
        const refreshToken = signJWT(
            {...user, session: session._id},
            {expiresIn: config.get<string>('refreshTokenTtl')}
        );
        res.cookie("accessToken", accessToken, accessTokenCookieOptions)
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
        res.redirect(`${config.get<string>('origin')}/auth/signin/callback`)
    } catch (e: any) {
        return res.redirect(`${config.get<string>('origin')}`)
    }
}
