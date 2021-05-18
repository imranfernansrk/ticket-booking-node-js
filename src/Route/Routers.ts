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

router.post('/createTicket',(req: Request, res: Response)=>{
    const createTicket = new ticketTemp({
        movieName: req.body.movieName,
        movieStartTime: req.body.movieStartTime,
        movieEndTime: req.body.movieEndTime,
        status: req.body.status
    });

    createTicket.save()
    .then((data: TicketObject)=>{
        console.log('SUCCESS 1');
        res.json(data);
    })
    .catch((error: any)=>{
        console.log('FAILURE ', error);
        res.json(error);
    })
})
router.delete('/ticket/:id',(req: Request, res: Response)=>{
    const createTicket = new ticketTemp({
        movieName: req.body.movieName,
        movieStartTime: req.body.movieStartTime,
        movieEndTime: req.body.movieEndTime,
        status: req.body.status
    });
    
    createTicket.save()
    .then((data: TicketObject)=>{
        console.log('SUCCESS 1');
        res.json(data);
    })
    .catch((error: any)=>{
        console.log('FAILURE ', error);
        res.json(error);
    })
})
// router.post('/createTicket',(req: Request, res: Response)=>{
//     const createTicket = new ticketTemp({
//         movieName: req.body.movieName,
//         movieStartTime: req.body.movieStartTime,
//         movieEndTime: req.body.movieEndTime,
//         status: req.body.status
//     });

//     createTicket.save()
//     .then((data: TicketObject)=>{
//         console.log('SUCCESS 1');
//         res.json(data);
//     })
//     .catch((error: any)=>{
//         console.log('FAILURE ', error);
//         res.json(error);
//     })
// })


module.exports = router;