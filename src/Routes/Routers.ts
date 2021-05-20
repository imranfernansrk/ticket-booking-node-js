import { Application } from 'express';
import { userControllers } from '../Controller/userControllers'
import { ticketController } from "../Controller/ticketController";
import { Auth } from '../Auth/Authentication'
const Authorization = new Auth();
export class userRoutes {
    constructor
    (public UserController:userControllers=new userControllers(),
    public TicketController:ticketController = new ticketController()){
        
    }
     public userroutes(app: Application):void {
         console.log("routes");
         app.route('/signup').post(this.UserController.signup);
         app.route('/signin').post(this.UserController.signin);
         app.route('/createTicket').post(Authorization.Auth,this.TicketController.createTicket);
         app.route('/ticket/:id').put(Authorization.Auth,this.TicketController.updateTicket);       
         app.route('/ticket/:id').delete(Authorization.Auth,this.TicketController.deleteTicket);
         app.route('/ticket/:id').get(Authorization.Auth,this.TicketController.getTicket);
         app.route('/tickets').get(Authorization.Auth,this.TicketController.getTicketsByStatus);
    }
}