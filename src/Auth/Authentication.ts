import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

module.exports = (req: Request, res: Response, next: NextFunction)=>{
    const authHeader = req.header('Authorization');
    //BEARER TOKEN
    if(!authHeader) return res.status(401).send("Auth Error")
    const token = authHeader.split(' ')[1];

    console.log("auth token", token);
    if(!token) return res.status(401).send("Auth Error")
    try{
        const getUser: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        if(getUser && getUser.user){
            req["user"] = getUser.user;
        }
        next();
    }catch(e){
        res.status(500).send({message: "Invalid Token"})
    }
}