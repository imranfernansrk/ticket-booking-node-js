import { userDao } from '../Dao/userDao';
import { UserValidate } from '../Validation/Validation'
import { Response } from '../Utils/Response';
import * as jwt from 'jsonwebtoken'
import { post_response, get_response, error_response, fail_response } from '../Utils/Types'
import { User, UserObject, TicketObject } from '../Utils/Types'
import { checkPassword, hashPassword } from '../ManagePassword/managePass';
import { Log } from "../Logger/Logger";

const Logs = new Log();
const response = new Response();
const validate = new UserValidate();
export class Services {
    constructor(public UserDao: userDao = new userDao()) {

    }
    public async signup(body: UserObject): Promise<post_response | get_response | error_response | fail_response> {
        let data: any = await this.UserDao.findone(body.username)
        let validation = await validate.validateUser(body);
        if (validation.message) {
            Logs.logger.error(validation.message);
            return response.badRequest(validation.message);
        }
        console.log('already data--', data);
        if (data != null || data != undefined) {
            Logs.logger.error('Username already exists');
            return response.badRequest('Username already exists');
        }
        body.password = await hashPassword(body.password);
        try {
            data = await this.UserDao.createUser(body);
            const token = jwt.sign({
                expiresIn: "3h",
                user: data._id
            }, process.env.ACCESS_TOKEN_SECRET_KEY);
            console.log('success', response.Success(data, token, "signin success"))
            Logs.logger.info("signup success");
            return response.Success(data, token, "signup success");
        } catch (e) {
            Logs.logger.error('failure');
            return response.badRequest("failure");
        }
    }

    public async signin(username: string, password: string): Promise<post_response | get_response | error_response | fail_response> {
        let user: any = await this.UserDao.findone(username);
        console.log('signin Serv', user);
        if (!user) {
            Logs.logger.error('Not found');
            return response.notFound()
        }
        if (! await checkPassword(password, user.password)) {
            Logs.logger.error('Password Incorrect');
            return response.error('Password Incorrect');
        }
        try {
            const token = jwt.sign({
                expiresIn: "3h",
                user: user._id
            }, process.env.ACCESS_TOKEN_SECRET_KEY);
            console.log('success', response.Success(user, token, "signin success"))
            Logs.logger.info("signin success");
            return response.Success(user, token, "signin success");
        } catch (e) {
            Logs.logger.error('Auth Generate Error');
            return response.error("Auth Generate Error");
        }
    }
    public async createTicket(body: TicketObject): Promise<post_response | get_response | error_response | fail_response> {
        try {
            let data: any = await this.UserDao.createTicket(body);
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
            let data: any = await this.UserDao.findByIdAndDelete(id);

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
            let data: any = await this.UserDao.findByIdAndUpdate(id, update);
            if (data == null) {
                Logs.logger.error('ticket not found');
                return response.notFound();
            }
            try {
                let ticket = await this.UserDao.getTicket(data._id);
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
            let data: any = await this.UserDao.getTicket(id);
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
            let data: any = await this.UserDao.getTicketsByFilter(filter);
            
            Logs.logger.info('get all ticket success');
            return response.Success(data, null, 'success');
        } catch (e) {
            Logs.logger.error('failure');
            return response.error('failure');
        }
    }
}