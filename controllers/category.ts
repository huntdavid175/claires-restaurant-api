import { Response, Request } from "express";
import { Category } from "../entity/category";
import { AppDataSource } from "../data-source";

const getMenuByCategory = async (req: Request, res: Response) => {
  const { categoryType }: { categoryType?: string } = req.query;

  const categoryRepository = AppDataSource.getRepository(Category);

  try {
    const category = await categoryRepository.findOne({
      where: { name: categoryType },
      relations: { menus: true },
    });

    console.log(category);

    res.status(200).json({ data: category });
  } catch (error) {
    console.log(error);
  }
};

export { getMenuByCategory };
