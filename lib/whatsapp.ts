import axios, { AxiosError } from "axios";
require("dotenv").config();

const accessToken = process.env.WHATSAPP_ACCESS_TOKEN as string;
const senderNumber = process.env.WHATSAPP_SENDER_NUMBER as string;
const recipientNumber = process.env.WHATSAPP_RECIPIENT_TEST_NUMBER as string;
const hostEndpoint = process.env.WHATSAPP_HOST_ENDPOINT as string;
const apiVersion = process.env.WHATSAPP_API_VERSION as string;

interface WhatsappInterface {
  accessToken: string;
  senderNumber: string;
  recipientNumber: string;
  hostEndpoint: string;
  apiVersion: string;
  fullEndpoint: string;
}

class Whatsapp implements WhatsappInterface {
  accessToken: string;
  senderNumber: string;
  recipientNumber: string;
  hostEndpoint: string;
  apiVersion: string;
  fullEndpoint: string;
  constructor(
    accessToken: string,
    senderNumber: string,
    recipientNumber: string,
    hostEndpoint: string,
    apiVersion: string
  ) {
    this.accessToken = accessToken;
    this.senderNumber = senderNumber;
    this.recipientNumber = recipientNumber;
    this.hostEndpoint = hostEndpoint;
    this.apiVersion = apiVersion;
  }

  async sendMessage(data: any) {
    try {
      const response = await axios.post(
        `${this.hostEndpoint}/v${this.apiVersion}/${this.senderNumber}/messages`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
    }
  }
}

const whatsapp = new Whatsapp(
  accessToken,
  senderNumber,
  recipientNumber,
  hostEndpoint,
  apiVersion
);

export { whatsapp };
