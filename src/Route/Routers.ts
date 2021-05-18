import * as express from 'express';
import {  Request, Response } from 'express';
var ticketTemp = require('../Models/TicketModel');

var router = express.Router();

interface TicketObject {
    id?: string,
    movieName: string,
    movieStartTime: string,
    movieEndTime: string,
    status: string
}

router.post('/createTicket', async(req: Request, res: Response)=>{
    const createTicket = new ticketTemp({
        movieName: req.body.movieName,
        movieStartTime: req.body.movieStartTime,
        movieEndTime: req.body.movieEndTime,
        status: req.body.status
    });

    await createTicket.save()
    .then((data: TicketObject)=>{
        res.json(data);
    })
    .catch((error: any)=>{
        res.status(500).send(error);
    })
})
router.delete('/ticket/:id',async (req: Request, res: Response)=>{
    const id = await req.params.id;
    await ticketTemp.findByIdAndDelete(id)
    .then((ticket)=>{
        if(! ticket){
            return res.status(404).send();
        }
        res.send(ticket);
    })
    .catch((error)=>{
        res.status(500).send(error);
    })
})
router.get('/ticket/:id',async (req: Request, res: Response)=>{
    const id = await req.params.id;
    await ticketTemp.findById(id)
    .then((ticket)=>{
        if(! ticket){
            return res.status(404).send();
        }
        res.send(ticket);
    })
    .catch((error)=>{
        res.status(500).send(error);
    })
})
router.get('/tickets',async (req: Request, res: Response)=>{
    const status = await req.query.status;
    console.log(status);
    await ticketTemp.find({ "status": status })
    .then((tickets)=>{
        if(! tickets){
            return res.status(404).send();
        }
        res.send(tickets);
    })
    .catch((error)=>{
        res.status(500).send(error);
    })
})
router.put('/ticket/:id',async (req: Request, res: Response)=>{
    const id = await req.params.id;
    const status = await req.body.status;

    await ticketTemp.findOneAndUpdate(id, { "status": status })
    .then((ticket)=>{
        console.log('succ', ticket)
        if(! ticket){
            return res.status(404).send();
        }
        res.send(ticket);
    })
    .catch((error)=>{
        console.log('fail')
        res.status(500).send(error);
    })
})

module.exports = router;