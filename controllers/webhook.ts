import { Request, Response } from "express";
import crypto from "crypto";

import { Order } from "../entity/orders";
import { AppDataSource } from "../database/data-source";

const secret = process.env.PAYSTACK_SECRET_KEY;
const orderRepository = AppDataSource.getRepository(Order);

const paymentWebHook = async (req: Request, res: Response) => {
  const hash = crypto
    .createHmac("sha512", secret!)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash == req.headers["x-paystack-signature"]) {
    const event = req.body;

    //Check is event is charge success
    if (event.event === "charge.success") {
      //Check if charge was successful and update as paid in order
      if (event.data.status === "success") {
        const orderId = event.data.metadata.custom_fields[0].order_id;

        const order = await orderRepository.findOne({
          where: { orderId: orderId },
        });

        if (order) {
          //   console.log(order);
          order.paid = true;
          AppDataSource.manager.save(order);
        }
      }
    }
  }

  res.sendStatus(200);
};

export { paymentWebHook };
