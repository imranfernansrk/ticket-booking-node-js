import TicketModel from '../Models/Ticket';
import { TicketObject } from '../Utils/Types';

export class ticketDao {
    public async createTicket(body: TicketObject): Promise<object> {
        console.log("body", body);
        const result = new TicketModel({
            movieName: body.movieName,
            movieStartTime: body.movieStartTime,
            movieEndTime: body.movieEndTime,
            status: body.status
        });
        return await result.save();
    }
    public async findByIdAndDelete(id: string): Promise<any> {
        return await TicketModel.findByIdAndDelete(id);
    }
    public async findByIdAndUpdate(id: string, update: object): Promise<any> {
        return await TicketModel.findByIdAndUpdate(id, update);
    }
    public async getTicket(id: string) {
        return await TicketModel.findById(id);
    }
    public async getTicketsByFilter(filter: object) {
        return await TicketModel.find(filter);
    }
}