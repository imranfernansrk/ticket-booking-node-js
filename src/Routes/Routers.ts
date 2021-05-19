import { Application } from 'express';
import { userControllers } from '../Controller/userControllers'
import { Auth } from '../Auth/Authentication'
const Authorization = new Auth();
export class userRoutes {
    constructor(public UserController:userControllers=new userControllers()){
        
    }
     public userroutes(app: Application):void {
         console.log("routes");
         app.route('/signup').post(this.UserController.signup);
         app.route('/signin').post(this.UserController.signin)
        //  app.route('/createTicket').post(Authorization.Auth,this.Controllers.getUser);
        //  app.route('/ticket/:id').put(Authorization.Auth,this.Controllers.getUser);       
        //  app.route('/ticket/:id').delete(Authorization.Auth,this.Controllers.getUser);
        //  app.route('/ticket/:id').get(Authorization.Auth,this.Controllers.getUser);
        //  app.route('/tickets').get(Authorization.Auth,this.Controllers.getUser);
    }
}