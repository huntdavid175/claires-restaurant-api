import express, { Request, Response, Router } from "express";
import axios from "axios";

const router: Router = express.Router();

const url = "https://api.paystack.co/charge";
const authorization =
  "Authorization: sk_test_76a53397a8e58bc471bb2c10b8715559d6a416e5";
const content_type = "Content-Type: application/json";
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
        Authorization:
          "Bearer sk_test_76a53397a8e58bc471bb2c10b8715559d6a416e5",
      },
    });

    console.log(response.data);
  } catch (error: any) {
    console.log(error.response);
  }
};

router.post("/", testFunc);

export default router;
