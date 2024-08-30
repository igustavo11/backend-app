import {Request, Response} from 'express'

import {SendOrderServices} from '../../services/order/SendOrderServices'

class SendOrderController{
    async handle(req: Request, res: Response){
        const {order_id} = req.body;

        const sendOrder = new SendOrderServices();

        const order = await sendOrder.execute({
            order_id
        });
     

        return res.json(order);
    }
}

export {SendOrderController}