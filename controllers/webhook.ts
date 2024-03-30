import { Request, Response } from "express";
import crypto from "crypto";

const secret = process.env.PAYSTACK_SECRET_KEY;

const paymentWebHook = (req: Request, res: Response) => {
  const hash = crypto
    .createHmac("sha512", secret!)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash == req.headers["x-paystack-signature"]) {
    const event = req.body;

    console.log(event);
  }

  res.send(200);
};

export { paymentWebHook };
