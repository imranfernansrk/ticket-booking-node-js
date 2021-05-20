import * as express from 'express';
import { Request, Response } from 'express';
import { hashPassword, checkPassword } from "../ManagePassword/managePass";
import * as jwt from "jsonwebtoken";
import { Response as res } from "../Utils/Response";
import { UserObject, TicketObject } from "../Utils/Types";
const responseObject = new res();
var Authntication = require("../Auth/Authentication");
var ticketTemp = require('../Models/Ticket');
var userTemp = require('../Models/User');

var router = express.Router();
const error = 'Something went wrong';

router.post('/signup', async (req: Request, res: Response) => {
    const { username, email, phoneNo, password, address } = await req.body;
    const user: UserObject = {
        username: username,
        email: email,
        phoneNo: phoneNo,
        password: password,
        address: address
    }
    try {
        let createUser = await userTemp.findOne({
            username
        })
        if (createUser) {
            return res.json(responseObject.error('Username Already Exist'))
        }
        createUser = new userTemp(user);
        createUser.password = await hashPassword(password);

        await createUser.save()
            .then((data: any) => {
                const payload = {
                    user: {
                        id: data._id
                    }
                }
                try {
                    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
                        expiresIn: '5m'
                    }, (err, token) => {
                        if (err) return res.json(responseObject.error('Auth Token Error'));
                        res.json(responseObject.Success(data, token, "signup success"));
                    });
                } catch (e) {
                    res.json(responseObject.error('Auth Generate Error'))
                }
            })
            .catch((err) => {
                res.json(responseObject.error('signup failure'))
            })
    } catch (e) {
        res.json(responseObject.error('failure'));
    }
})
router.post('/signin', async (req: Request, res: Response) => {
    const { username, password } = await req.body;
    try {
        let user: any = await userTemp.findOne({
            username
        })
        if (!user) {
            return res.json(responseObject.notFound());
        }
        if (! await checkPassword(password, user.password)) {
            return res.json(responseObject.error('password incorrect'));
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
                if (err) return res.json(responseObject.error('Auth Token Error'));
                res.json(responseObject.Success(user, token, "signin success"));
            });
        } catch (e) {
            res.json(responseObject.error('Auth Generate Error'))
        }
    } catch (e) {
        res.json(responseObject.notFound());
    }
});

router.post('/createTicket', Authntication, async (req: Request, res: Response) => {
    const { movieName, movieStartTime, movieEndTime, status } = req.body;
    const newTicket: TicketObject = {
        movieName: movieName,
        movieStartTime: movieStartTime,
        movieEndTime: movieEndTime,
        status: status
    }
    try {
        const createTicket = new ticketTemp(newTicket);
        await createTicket.save()
            .then((data: any) => {
                res.json(responseObject.Success(data, null, "success"));
            })
            .catch((error: any) => {
                res.json(responseObject.error('failure'))
            })
    } catch (e) {
        res.json(responseObject.badRequest('failure'));
    }
})
router.delete('/ticket/:id', Authntication, async (req: Request, res: Response) => {
    const id = await req.params.id;
    if (id == undefined) {
        return res.json(responseObject.badRequest('failure'))
    };
    try {
        await ticketTemp.findByIdAndDelete(id)
            .then((ticket) => {
                if (!ticket) {
                    return res.json(responseObject.notFound());
                }
                res.json(responseObject.Success(ticket, null, "success"));
            })
            .catch((error) => {
                res.json(responseObject.notFound());
            })
    } catch (e) {
        res.json(responseObject.badRequest('failure'))
    }

})
router.get('/ticket/:id', Authntication, async (req: Request, res: Response) => {
    const id = await req.params.id;
    if (id == undefined) {
        return res.json(responseObject.badRequest('failure'));
    }
    try {
        await ticketTemp.findById(id)
            .then((ticket) => {
                if (!ticket) {
                    return res.json(responseObject.notFound());
                }
                res.json(responseObject.Success(ticket, null, "success"));
            })
            .catch((error) => {
                res.json(responseObject.notFound());
            })
    } catch (e) {
        res.json(responseObject.badRequest('failure'));
    }
})
router.get('/tickets', Authntication, async (req: Request, res: Response) => {
    const status = await req.query.status;
    if (status == undefined) {
        return res.json(responseObject.badRequest('failure'));
    }
    try {
        await ticketTemp.find({ "status": status })
            .then((tickets) => {
                if (tickets.length < 1) {
                    return res.json(responseObject.notFound());
                }
                res.json(responseObject.Success(tickets, null, "success"));
            })
            .catch((error) => {
                res.json(responseObject.error('failure'));
            })
    } catch (e) {
        res.json(responseObject.badRequest('failure'));
    }
})
router.put('/ticket/:id', Authntication, async (req: Request, res: Response) => {
    const id = await req.params.id;
    const status = await req.body.status;
    console.log(id, status)
    if (id == undefined || status == undefined) {
        return res.json(responseObject.badRequest('failure'));
    }
    const update = {
        "status": status
    }
    try {
        await ticketTemp.findByIdAndUpdate(id, update)
            .then((ticket) => {
                if (!ticket) {
                    return res.json(responseObject.notFound());
                }
                try {
                    ticketTemp.findById(ticket.id)
                        .then((data) => {
                            res.json(responseObject.Success(data, null, "success"));
                        })
                        .catch((err) => {
                            res.json(responseObject.error('failure'));
                        })
                } catch (e) {
                    res.json(responseObject.error('failure'));
                }
            })
            .catch((error) => {
                res.json(responseObject.notFound());
            })
    } catch (e) {
        res.json(responseObject.badRequest('failure'));
    }
})

module.exports = router;