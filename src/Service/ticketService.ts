import { ticketDao } from '../Dao/ticketDao';
import { UserValidate } from '../Validation/Validation'
import { Response } from '../Utils/Response';
import { post_response, get_response, error_response, fail_response } from '../Utils/Types'
import { TicketObject } from '../Utils/Types'
import { Log } from "../Logger/Logger";

const Logs = new Log();
const response = new Response();
const validate = new UserValidate();

export class ticketService {
    constructor(public TicketDao: ticketDao = new ticketDao()) {

    }
    public async createTicket(body: TicketObject): Promise<post_response | get_response | error_response | fail_response> {
        try {
            let data: any = await this.TicketDao.createTicket(body);
            if (data == null) {
                Logs.logger.error('create ticket failure');
                return response.error('create ticket failure');
            }
            Logs.logger.info('create ticket success');
            return response.Success(data, null, 'success');
        } catch (e) {
            Logs.logger.error('create ticket failure');
            return response.error('create ticket failure');
        }
    }
    public async deleteTicket(id: string): Promise<post_response | get_response | error_response | fail_response> {
        if (id == undefined) {
            Logs.logger.error('ticket id not found');
            return response.badRequest('failure');
        }
        try {
            let data: any = await this.TicketDao.findByIdAndDelete(id);
            if(data == null){
                Logs.logger.error('ticket not found');
                return response.notFound() 
            }
            Logs.logger.info('delete ticket success')
            return response.Success(data, null, 'success');
        } catch (e) {
            Logs.logger.error('ticket not found');
            return response.notFound();
        }
    }
    public async updateTicket(id: string, status: string): Promise<post_response | get_response | error_response | fail_response> {
        if (id == undefined || status == undefined) {
            Logs.logger.error('bad update request');
            return response.badRequest('failure');
        }
        const update = {
            "status": status
        }
        try {
            let data: any = await this.TicketDao.findByIdAndUpdate(id, update);
            if (data == null) {
                Logs.logger.error('ticket not found');
                return response.notFound();
            }
            try {
                let ticket = await this.TicketDao.getTicket(data._id);
                Logs.logger.error('ticket update success');
                return response.Success(ticket, null, 'success');
            } catch (e) {
                Logs.logger.error('get ticket failure');
                return response.error('get ticket failure');
            }
        } catch (e) {
            Logs.logger.error('ticket not found');
            return response.notFound();
        }
    }
    public async getTicket(id: string): Promise<post_response | get_response | error_response | fail_response> {
        if (id == undefined) {
            Logs.logger.error('Bad request');
            return response.badRequest('failure');
        }
        try {
            let data: any = await this.TicketDao.getTicket(id);
            if (data == null) {
                Logs.logger.error('ticket not found');
                return response.notFound();
            }
            Logs.logger.info('get ticket success');
            return response.Success(data, null, 'success');
        } catch (e) {
            Logs.logger.error('ticket not found');
            return response.notFound();
        }
    }
    public async getTicketByStatus(query: any): Promise<post_response | get_response | error_response | fail_response> {
        if (query && query?.status == undefined) {
            Logs.logger.error('Bad request');
            return response.badRequest('failure');
        }
        let status = query.status;
        let filter = {
            status: status
        }
        try {
            let data: any = await this.TicketDao.getTicketsByFilter(filter);
            
            Logs.logger.info('get all ticket success');
            return response.Success(data, null, 'success');
        } catch (e) {
            Logs.logger.error('failure');
            return response.error('failure');
        }
    }
}