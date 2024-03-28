import express, { Request, Response, Router } from "express";
import axios from "axios";

const router: Router = express.Router();

const url = "https://api.paystack.co/charge";
const secretKey = process.env.PAYSTACK_SECRET_KEY;

const data = {
  email: "huntdavid175@gmail.com",
  amount: "10000",
  currency: "GHS",
  metadata: {
    custom_fields: [
      {
        value: "makurdi",
        display_name: "Donation for",
        variable_name: "donation_for",
      },
    ],
  },
  mobile_money: {
    phone: "0551234987",
    provider: "MTN",
  },
  birthday: "1995-12-23",
};

const testFunc = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
    });

    console.log(response.data);
  } catch (error: any) {
    console.log(error.response);
  }
};

router.post("/", testFunc);

export default router;
