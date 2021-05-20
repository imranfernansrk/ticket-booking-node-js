import { userDao } from '../Dao/userDao';
import { UserValidate } from '../Validation/Validation'
import { Response } from '../Utils/Response';
import * as jwt from 'jsonwebtoken'
import { post_response, get_response, error_response, fail_response } from '../Utils/Types'
import { UserObject } from '../Utils/Types'
import { checkPassword, hashPassword } from '../ManagePassword/managePass';
import { Log } from "../Logger/Logger";

const Logs = new Log();
const response = new Response();
const validate = new UserValidate();
export class userService {
    constructor(public UserDao: userDao = new userDao()) {

    }
    public async signup(body: UserObject): Promise<post_response | get_response | error_response | fail_response> {
        try{
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
        }catch(e){
            Logs.logger.error('signup failed');
            return response.badRequest("signup failed");
        }
    }

    public async signin(username: string, password: string): Promise<post_response | get_response | error_response | fail_response> {
        try{
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
        }catch(e){
            Logs.logger.error('signin failed');
            return response.error('signin failed');
        }
    }
    public async bookTickets(userId: string, ticketsId: string[]): Promise<post_response | get_response | error_response | fail_response>{
        try{
            let user: any = await this.UserDao.getUser(userId);
            console.log('mt user', user);
            if(userId == undefined || user == null){
                Logs.logger.error("Invalid User Id");
                return response.error("Invalid User Id")
            }
            let bookedTicketsId: string[] = user.ticketIds;
            let updateBookingIds: string[] = bookedTicketsId;
            ticketsId.forEach(ticketId => {
                if(bookedTicketsId.includes(ticketId)){
    
                }else{
                    updateBookingIds.push(ticketId);
                }
            });
            let update = {
                ticketIds: updateBookingIds
            }
            try{
                let result: any = await this.UserDao.findByIdAndUpdate(user._id, update);
                let data: any = await this.UserDao.getUser(result._id);
                if(data == null){
                    Logs.logger.error("could not get user data");
                    return response.error('could not get user data');
                }
                Logs.logger.info("book ticket success");
                return response.Success(data, null, 'success');
            }catch(e){
                Logs.logger.error("update failure");
                return response.error('update failure');
            }
        }catch(e){
            Logs.logger.error("update failure");
            return response.error('update failure');
        }
    }
}