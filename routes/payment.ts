import express, { Router, Request, Response } from "express";

import { AppDataSource } from "../database/data-source";
import { Payment } from "../entity/payments";
import { PaymentStatus } from "../entity/payments";
import axios from "axios";

const router: Router = express.Router();

const paymentRepository = AppDataSource.getRepository(Payment);

const updateOrderTransaction = async (req: Request, res: Response) => {
  const { paymentId } = req.body;

  const payment = await paymentRepository.findOne({
    where: { payment_id: Number(paymentId) },
  });

  if (!payment) {
    res.status(404).json({ message: "Payment not found" });
  } else {
    try {
      const axiosResponse = await axios.get(
        `https://api.paystack.co/transaction/${payment?.transaction_id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      const transactionStatus = axiosResponse.data.data.status;

      //   console.log(transactionStatus);

      if (transactionStatus === "success") {
        payment.payment_gateway = axiosResponse.data.data.gateway_response;
        payment.payment_reference = axiosResponse.data.data.reference;
        payment.authorization_code =
          axiosResponse.data.data.authorization.authorization_code;
        payment.payment_status = PaymentStatus.Paid;
        payment.payment_date = axiosResponse.data.data.paid_at;

        const savedPayment = await paymentRepository.save(payment);

        res.status(200).json({ data: savedPayment });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

router.post("/update", updateOrderTransaction);

export default router;
