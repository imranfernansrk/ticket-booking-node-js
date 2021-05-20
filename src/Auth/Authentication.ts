import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { Response as Res } from "../Utils/Response";
import { Log } from "../Logger/Logger";

const response = new Res();
const Logs = new Log();
export class Auth {
    public Auth(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.header('Authorization');
        //BEARER TOKEN
        if (!authHeader){
            Logs.logger.error('Auth Token Not Found');
            return res.status(400).json(response.error('Auth Token Not Found'));
        } 
        const token = authHeader.split(' ')[1];
        console.log("auth token", token);
        if (!token){
            Logs.logger.error('Auth Token Not Found');
            return res.status(400).json(response.error('Auth Token Not Found'));
        }
        try {
            const getUser: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
            if (getUser && getUser.user) {
                req["user"] = getUser.user;
            }
            Logs.logger.info('Auth Token Success');
            next();
        } catch (e) {
            Logs.logger.error('Invalid Auth Token');
            res.status(400).json(response.error('Invalid Auth Token'));
        }
    }
}