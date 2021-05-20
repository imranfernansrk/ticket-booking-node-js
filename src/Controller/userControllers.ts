import { Request, Response } from 'express';
import { userService } from '../Service/userService';
import { UserObject } from '../Utils/Types'
import { post_response, get_response, error_response, fail_response } from '../Utils/Types'
import { Log } from "../Logger/Logger";

const Logs = new Log();
const UserService = new userService();

export class userControllers {
    public async signup(req: Request, res: Response): Promise<void> {
        Logs.logger.info('Signup api trigger');
        const body: UserObject = req.body
        const data: post_response | get_response | error_response | fail_response = await UserService.signup(body);
        res.status(data.statusCode).json(data);
    }
    public async signin(req: Request, res: Response): Promise<void> {
        Logs.logger.info('Signin api trigger');
        const { username, password } = await req.body;
        console.log('signin Cntr', username, password);
        let result: post_response | get_response | error_response | fail_response = await UserService.signin(username, password);
        console.log('status code', await result);
        res.status(result.statusCode).json(result);
    }
    public async bookTickets(req: Request, res: Response): Promise<void>{
        Logs.logger.info('Booktickets api triggers');
        const {userId, bookTickets} = req.body;
        const result: post_response | get_response | error_response | fail_response = await UserService.bookTickets(userId, bookTickets);
        res.status(result.statusCode).json(result);
    }
}