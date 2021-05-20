import { Request, Response } from 'express';
import { ticketService } from '../Service/ticketService';
import { TicketObject } from '../Utils/Types'
import { post_response, get_response, error_response, fail_response } from '../Utils/Types'
import { Log } from "../Logger/Logger";

const Logs = new Log();
const TicketService = new ticketService();

export class ticketController {
    public async createTicket(req: Request, res: Response): Promise<void> {
        Logs.logger.info('cretae ticket api trigger');
        const body: TicketObject = req.body;
        const data: post_response | get_response | error_response | fail_response = await TicketService.createTicket(body);
        res.status(data.statusCode).json(data);
    }
    public async deleteTicket(req: Request, res: Response): Promise<void> {
        Logs.logger.info('delete ticket api trigger');
        const id = req.params.id;
        const data: post_response | get_response | error_response | fail_response = await TicketService.deleteTicket(id);
        res.status(data.statusCode).json(data);
    }
    public async updateTicket(req: Request, res: Response): Promise<void> {
        const id = await req.params.id;
        const status = await req.body.status;
        const data: post_response | get_response | error_response | fail_response = await TicketService.updateTicket(id, status);
        res.status(data.statusCode).json(data);
    }    
    public async getTicket(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const data: post_response | get_response | error_response | fail_response = await TicketService.getTicket(id);
        res.status(data.statusCode).json(data);
    }    
    public async getTicketsByStatus(req: Request, res: Response): Promise<void> {
        const query = req.query;
        const data: post_response | get_response | error_response | fail_response = await TicketService.getTicketByStatus(query);
        res.status(data.statusCode).json(data);
    }
}