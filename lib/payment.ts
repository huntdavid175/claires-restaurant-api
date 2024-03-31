import axios from "axios";

const initiatePayment = async (
  customerPhoneNumber: string,
  paymentProvider: string,
  amountToPay: number,
  orderId: number
) => {
  const url = "https://api.paystack.co/charge";
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  const data = {
    email: "huntdavid175@gmail.com",
    amount: String(amountToPay * 100),
    currency: "GHS",
    metadata: {
      custom_fields: [
        {
          value: "makurdi",
          order_id: orderId,
        },
      ],
    },
    mobile_money: {
      phone: "0551234987",
      provider: "MTN",
    },
  };

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

export { initiatePayment };
