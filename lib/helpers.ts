import { AppDataSource } from "../database/data-source";
import { PizzaOrder } from "../entity/orders";

const updateTransactionWithId = async (
  orderId: number,
  transactionId: string
) => {
  const orderRepository = AppDataSource.getRepository(PizzaOrder);

  try {
    const order = await orderRepository.findOne({
      where: { orderId: orderId },
      relations: { payment: true },
    });

    if (order) {
      order.payment.transaction_id = transactionId;
      const res = await orderRepository.save(order);
    }
  } catch (error) {}
};

export { updateTransactionWithId };
