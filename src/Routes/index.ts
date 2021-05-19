import { Application } from 'express';
import { userRoutes } from './Routers'

export class initialRoutes{
    user :userRoutes;
    constructor(){
      this.user=new userRoutes();
    }
    public initialRoutes(app: Application): void {
        this.user.userroutes(app);
    }
}