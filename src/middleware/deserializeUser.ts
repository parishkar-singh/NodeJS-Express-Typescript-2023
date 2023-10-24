import {NextFunction, Request, Response} from "express";
import {get} from "lodash";
import {verifyJWT} from "../utils/jwt.utils";
import logger from "../utils/logger";
import {reIssueAccessToken} from "../service/session.service";
import config from "config";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = get(req,'cookies.accessToken') ||get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
        const refreshToken =get(req,'cookies.refreshToken') || get(req, "headers.x-refresh");
        if (!accessToken) return next();
        const {decoded, expired} = verifyJWT(accessToken);
        if (decoded) {
            res.locals.user = decoded;
            return next();
        }
        // console.log(res.locals.user);
        if (expired && refreshToken) {
            const newAccessToken = await reIssueAccessToken({ refreshToken  });
            // console.log({newAccessToken});
            if (newAccessToken) {
                res.setHeader("x-access-token", newAccessToken);
                res.cookie("accessToken", accessToken, {
                    maxAge:900000,
                    httpOnly: true,
                    domain:config.get<string>('domain'),
                    path:'/',
                    sameSite:'strict',
                    secure:false
                })
            }

            const result = verifyJWT(newAccessToken as string);
            res.locals.user = result.decoded;
            return next();
        }
        return next();
    } catch (e) {
        logger.error(e);
    }


}
export default deserializeUser;
