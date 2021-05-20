import { userDao } from '../Dao/userDao';
import { UserValidate } from '../Validation/Validation'
import { Response } from '../Utils/Response';
import * as jwt from 'jsonwebtoken'
import { post_response, get_response, error_response, fail_response } from '../Utils/Types'
import { User, UserObject, TicketObject } from '../Utils/Types'
import { checkPassword, hashPassword } from '../ManagePassword/managePass';
const response = new Response();
const validate = new UserValidate();
export class Services {
    constructor(public UserDao: userDao = new userDao()) {

    }
    public async signup(body: UserObject): Promise<post_response | get_response | error_response | fail_response> {
        let data: any = await this.UserDao.findone(body.username)
        let validation = await validate.validateUser(body);
        if(validation.message){
            return response.badRequest(validation.message);
        }
        if (!data) {
            data.password = await hashPassword(data.password);
            data = await this.UserDao.createUser(body);
        }
        const payload = {
            user: {
                id: data._id
            }
        }
        try {
            jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
                expiresIn: '5m'
            }, (err, token) => {
                if (err) {
                    return response.error('Auth Token Error');
                }
                return response.Success(data, token, "signup success");
            });
        } catch (e) {
            return response.error('Auth Generate Error');
        }
    }

    public async signin(username: string, password: string): Promise<post_response | get_response | error_response | fail_response> {
        let user: any = await this.UserDao.findone(username);
        console.log('signin Serv', user);
        if (!user) {
            return response.notFound()
        }
        if (! await checkPassword(password, user.password)) {
            return response.error('Auth Generate Error');
        }
        const payload = {
            user: {
                id: user._id
            }
        }
        try {
            jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
                expiresIn: '5m'
            }, (err, token) => {
                if (err) {
                    return response.error('Auth Token Error');
                }
                return response.Success(user, token, "signin success");
            });
        } catch (e) {
            return response.error('Auth Generate Error');
        }
    }
    public async createTicket(body: TicketObject): Promise<post_response | get_response | error_response | fail_response> {
        try {
            let data: any = await this.UserDao.createTicket(body);
            if (!data) {
                return response.error('failure');
            }
            return response.Success(data, null, 'success');
        } catch (e) {
            return response.error('Auth Generate Error');
        }
    }
    public async deleteTicket(id: string): Promise<post_response | get_response | error_response | fail_response> {
        if (id == undefined) {
            return response.badRequest('failure');
        }
        try {
            let data: any = await this.UserDao.findByIdAndDelete(id);
            if (!data) {
                return response.error('failure');
            }
            return response.Success(data, null, 'success');
        } catch (e) {
            return response.notFound();
        }
    }
    public async updateTicket(id: string, status: string): Promise<post_response | get_response | error_response | fail_response> {
        if (id == undefined || status == undefined) {
            return response.badRequest('failure');
        }
        const update = {
            "status": status
        }
        try {
            let data: any = await this.UserDao.findByIdAndUpdate(id, update);
            if (!data) {
                return response.notFound();
            }
            try {
                let ticket = await this.UserDao.getTicket(data._id);
                return response.Success(ticket, null, 'success');
            } catch (e) {
                return response.error('failure');
            }
        } catch (e) {
            return response.notFound();
        }
    }
    public async getTicket(id: string): Promise<post_response | get_response | error_response | fail_response> {
        if (id == undefined) {
            return response.badRequest('failure');
        }
        try {
            let data: any = await this.UserDao.getTicket(id);
            if (!data) {
                return response.notFound();
            }
            return response.Success(data, null, 'success');
        } catch (e) {
            return response.notFound();
        }
    }
    public async getTicketByStatus(query: any): Promise<post_response | get_response | error_response | fail_response> {
        if(query && query?.status == undefined){
            return response.badRequest('failure');
        }
        let status = query.status;
        let filter = {
            status: status
        }
        try {
            let data: any = await this.UserDao.getTicketsByFilter(filter);
            if (data.length < 1) {
                return response.notFound();
            }
            return response.Success(data, null, 'success');
        } catch (e) {
            return response.notFound();
        }
    }
}