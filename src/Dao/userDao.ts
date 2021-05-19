import * as TicketModel from '../Models/Ticket';
import UserModel from "../Models/User";
import { User, UserObject, TicketObject } from '../Utils/Types'
export class userDao {
    public async createUser(body: UserObject):Promise<object>{
        console.log("body",body);
        const result = new UserModel({
            username: body.username,
            email: body.email,
            phoneNo: body.phoneNo,
            password: body.password,
            address: body.address
          });
        return await result.save();
    }

    // public async signin(id:string):Promise<any>{
    //     return await userModal.findById(id); 
    // }
    public async findone(data:string){
        return await UserModel.findOne({username:data}); 
    }
    // public async updateuser(id:string,data:data):Promise<object | null>{
    //    return await userModal.findOneAndUpdate({_id: id}, data);
    // }
}