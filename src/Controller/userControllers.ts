import { Request, Response } from 'express';
import { Services } from '../Service/Services';
import { User, UserObject, TicketObject } from '../Utils/Types'
import { post_response, get_response, error_response, fail_response } from '../Utils/Types'

const UserService = new Services();

export class userControllers {
    public async signup(req: Request, res: Response): Promise<void> {
        const body: UserObject = req.body
        const data: post_response | get_response | error_response | fail_response = await UserService.signup(body);
        res.status(data.statusCode).json(data);
    }
    public async signin(req: Request, res: Response): Promise<void> {
        const { username, password } = await req.body;
        console.log('signin Cntr', username, password);
        const data: post_response | get_response | error_response | fail_response = await UserService.signin(username, password);
        res.status(data.statusCode).json(data);
    }
    public async createTicket(req: Request, res: Response): Promise<void> {
        const body: TicketObject = req.body;
        const data: post_response | get_response | error_response | fail_response = await UserService.createTicket(body);
        res.status(data.statusCode).json(data);
    }
    public async deleteTicket(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const data: post_response | get_response | error_response | fail_response = await UserService.deleteTicket(id);
        res.status(data.statusCode).json(data);
    }
    public async updateTicket(req: Request, res: Response): Promise<void> {
        const id = await req.params.id;
        const status = await req.body.status;
        const data: post_response | get_response | error_response | fail_response = await UserService.updateTicket(id, status);
        res.status(data.statusCode).json(data);
    }    
    public async getTicket(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const data: post_response | get_response | error_response | fail_response = await UserService.getTicket(id);
        res.status(data.statusCode).json(data);
    }    
    public async getTicketsByStatus(req: Request, res: Response): Promise<void> {
        const query = req.query;
        const data: post_response | get_response | error_response | fail_response = await UserService.getTicketByStatus(query);
        res.status(data.statusCode).json(data);
    }
}