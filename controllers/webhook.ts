import { Request, Response } from "express";
import crypto from "crypto";

import { Payment } from "../entity/payments";
import { AppDataSource } from "../database/data-source";

import { PaymentStatus } from "../entity/payments";

const secret = process.env.PAYSTACK_SECRET_KEY;
const paymentRepository = AppDataSource.getRepository(Payment);

const paymentWebHook = async (req: Request, res: Response) => {
  const hash = crypto
    .createHmac("sha512", secret!)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash == req.headers["x-paystack-signature"]) {
    const event = req.body;

    //Check if event is charge success
    if (event.event === "charge.success") {
      //Check if charge was successful and update as paid in order
      if (event.data.status === "success") {
        const orderId = event.data.metadata.custom_fields[0].order_id;

        // Retrieve the order payment from  db

        const payment = await paymentRepository.findOne({
          where: {
            pizzaOrder: { orderId: orderId },
          },
        });
        // console.log(event.data);
        //If there is that order in db, update it
        if (payment) {
          payment.payment_status = PaymentStatus.Paid;
          payment.payment_gateway = event.data.gateway_response;
          payment.payment_date = event.data.paid_at;
          payment.authorization_code =
            event.data.authorization.authorization_code;
          payment.payment_reference = event.data.reference;
          AppDataSource.manager.save(payment);
        }
      }
    }
  }

  res.sendStatus(200);
};

export { paymentWebHook };
