import UserModel from "../Models/User";
import { UserObject } from '../Utils/Types'
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
    public async findone(data:string){
        console.log('Dao', data)
        return await UserModel.findOne({username:data}); 
    }
    public async getUser(id: string){
        return await UserModel.findById(id);
    }
}