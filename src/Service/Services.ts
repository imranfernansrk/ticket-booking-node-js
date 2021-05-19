import { userDao } from '../Dao/userDao';
// import { User } from '../Validation/validation'
import { Response } from '../Utils/Response';
import * as jwt from 'jsonwebtoken'
import { post_response, get_response, error_response, fail_response } from '../Utils/Types'
import { User, UserObject, TicketObject } from '../Utils/Types'
import { checkPassword, hashPassword } from '../ManagePassword/managePass';
const response = new Response();
// const user_validate = new User();
export class Services {
    constructor(public UserDao: userDao = new userDao()) {

    }
    public async signup(body: UserObject): Promise<post_response | get_response | error_response | fail_response> {
        let data: any = await this.UserDao.findone(body.username)
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
                if (err){
                    return response.error('Auth Token Error');
                }
                return response.Success(user, token, "signin success");
            });
        } catch (e) {
            return response.error('Auth Generate Error');
        }
    }

    // public async updateuser(id: string, body: data): Promise<post_response | get_response | error_response> {

    //         const user: any = await this.UserDao.getUser(id);
    //         const validation = user_validate.validateUser(body);
    //         if (validation.message){
    //             return response.badRequest(validation.message)
    //         }
    //         user.firstName = body.firstName;
    //         user.lastName = body.lastName;
    //         user.gender = body.gender;
    //         user.dob = body.dob;
    //         user.email = body.email
    //         user.address = body.address
    //         await this.UserDao?.updateuser(user._id, user)
    //     let result = await this.UserDao.getUser(id);
    //     if(!result){
    //         return response.notFound()
    //       }
    //     return response.Success(result,null,"sucess");
    // }

}