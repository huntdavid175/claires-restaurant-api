import { Response, Request } from "express";

import { PizzaOrder } from "../entity/orders";
import { Menu } from "../entity/menu";
import { AppDataSource } from "../database/data-source";
import { initiatePayment } from "../lib/payment";
import { Payment } from "../entity/payments";

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orderRepository = AppDataSource.getRepository(PizzaOrder);
    const allOrders = await orderRepository.find({
      relations: { payment: true },
    });
    res.status(200).json({ data: allOrders });
  } catch (error) {
    res.status(404).json({ status: 404, message: "Resource not found" });
  }
};

const createOrder = async (req: Request, res: Response) => {
  const { productId, address, quantity, size, phone, provider } = req.body;

  const menuRepository = AppDataSource.getRepository(Menu);
  const orderedProductDetails = await menuRepository.findOne({
    where: { id: productId },
    relations: { sizes: true },
  });

  const orderedSize = orderedProductDetails?.sizes.find((item) => {
    return item.name.toLowerCase() === size;
  });

  if (!orderedSize) {
    return res.status(404).json({ message: "Order size doesn't exist" });
  }

  try {
    const newOrder = new PizzaOrder();
    const newPayment = new Payment();

    // Adding details for orders
    newOrder.address = address;
    newOrder.phone = phone;
    newOrder.productName = orderedProductDetails?.food_name
      ? orderedProductDetails.food_name
      : "";
    newOrder.quantity = quantity;
    newOrder.size = size;

    newOrder.paid = false;
    newOrder.processed = false;
    newOrder.total = quantity * orderedSize.price;

    //Adding details for payment
    newPayment.payment_method = "MTN";
    newPayment.payment_currency = "GHS";
    newPayment.transaction_amount = quantity * orderedSize.price;

    //Link payment to order
    newOrder.payment = newPayment;

    //Save order
    const response = await AppDataSource.manager.save(newOrder);

    //Check if order was saved and then send payment request
    if (response) {
      initiatePayment(phone, provider, response.total, response.orderId);
    }

    res.status(201).json({ message: "Order created" });
  } catch (error) {
    console.log(error);
  }
};

export { getAllOrders, createOrder };
