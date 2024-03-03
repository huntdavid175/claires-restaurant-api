import { Request, Response } from "express";
import { whatsapp } from "../lib/whatsapp";

const sendWhatsappMessage = async (req: Request, res: Response) => {
  const data = {
    messaging_product: "whatsapp",
    to: "233545817432", // Add the recipient number here
    type: "template",
    template: {
      name: "hello_world",
      language: {
        code: "en_US",
      },
    },
  };

  whatsapp.sendMessage(data);
};

export { sendWhatsappMessage };
