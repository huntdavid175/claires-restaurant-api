import { Response, Request } from "express";
import { Order } from "../entity/orders";
import { Menu } from "../entity/menu";
import { AppDataSource } from "../database/data-source";

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orderRepository = AppDataSource.getRepository(Order);
    const allOrders = await orderRepository.find();
    res.status(200).json({ data: allOrders });
  } catch (error) {
    res.status(404).json({ status: 404, message: "Resource not found" });
  }
};

const createOrder = async (req: Request, res: Response) => {
  const { productId, address, quantity, size } = req.body;

  const menuRepository = AppDataSource.getRepository(Menu);
  const orderedProductDetails = await menuRepository.findOne({
    where: { id: productId },
    relations: { sizes: true },
  });
  console.log(orderedProductDetails);

  try {
    const newOrder = new Order();
    newOrder.address = address;
    newOrder.productName = orderedProductDetails?.food_name
      ? orderedProductDetails.food_name
      : "";
    newOrder.quantity = quantity;
    newOrder.size = size;

    newOrder.paid = false;
    newOrder.processed = false;
    newOrder.total = quantity * 100;

    await AppDataSource.manager.save(newOrder);

    res.status(201).json({ message: "Order created" });
  } catch (error) {
    console.log(error);
  }
};

export { getAllOrders, createOrder };
