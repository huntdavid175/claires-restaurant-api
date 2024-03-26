import { Request, Response } from "express";
import { Menu } from "../entity/menu";
import { Price } from "../entity/price";
import { Size } from "../entity/sizes";
import { Category } from "../entity/category";
import { AppDataSource } from "../database/data-source";

const menuRepository = AppDataSource.getRepository(Menu);
const categoryRepository = AppDataSource.getRepository(Category);
const sizeRepository = AppDataSource.getRepository(Size);
const priceRepository = AppDataSource.getRepository(Price);

const getSingleMeal = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;

  try {
    const singleMenu = await menuRepository.findOne({
      where: { id: id },
      relations: { sizes: true },
    });

    if (singleMenu) {
      return res.status(200).json({ data: singleMenu, message: "Success" });
    } else {
      return res.status(404).json({ message: "Resource not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Get all menu items
const getMenu = async (req: Request, res: Response) => {
  // const menuRepository = AppDataSource.getRepository(Menu);

  try {
    const allMenu = await menuRepository.find({
      relations: ["sizes", "category"],
      // "sizes.prices",
    });
    // console.log(allMenu);
    res.status(200).json({ data: allMenu });
  } catch (error) {
    console.log(error);
  }
};

// Add a menu item
const addMenu = async (req: Request, res: Response) => {
  const { food_name, description, category, prices, imageUrl } = req.body;

  // create new menu
  const menu = new Menu();
  menu.food_name = food_name;
  menu.description = description;
  menu.image_url = imageUrl;

  const sizes = prices.map((item: { size: string; price: number }) => {
    console.log(item.size);
    const size = new Size();
    size.name = item.size;
    size.price = Number(item.price);
    return size;
    // menu.sizes.push(size);
  });
  console.log(sizes);
  menu.sizes = sizes;

  // create new menu-price
  // const price = new Price();
  // price.small = small;
  // price.medium = medium;
  // price.large = large;
  // price.extralarge = extraLarge;
  // price.menu = menu;

  // menu.price = price;

  // const menuRepository = AppDataSource.getRepository(Menu);

  // Find if a category exists
  const categoryExists = await categoryRepository.findOne({
    where: { name: category },
  });

  // Add menu to category if category already exists..
  if (categoryExists) {
    menu.category = categoryExists;

    const responseMenu = await menuRepository.save(menu);
    const result = await menuRepository.findOne({
      where: { id: responseMenu.id },
      relations: { sizes: true, category: true },
    });
    res.status(201).json({ data: { result } });
  } else {
    // create new category
    const newCategory = new Category();
    newCategory.name = category;
    menu.category = newCategory;
    const responseMenu = await menuRepository.save(menu);
    const result = await menuRepository.findOne({
      where: { id: responseMenu.id },
      relations: { sizes: true, category: true },
    });
    res.status(201).json({ data: { result } });
  }
};

const getMenuByCategory = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;

  const categoryRepository = AppDataSource.getRepository(Category);

  try {
    const category = await categoryRepository.findOne({
      where: { id: id },
      relations: { menus: true },
    });
    console.log(category);
    if (category) {
      return res.status(200).json({ message: "Success", data: category });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Get by all categories
const getMenuByCategories = async (req: Request, res: Response) => {
  const { allMenu } = req.query;

  const categoryRepository = AppDataSource.getRepository(Category);
  if (allMenu) {
    const categoriesByMenu = await categoryRepository.find({
      relations: { menus: true },
    });

    return res.status(200).json({ data: categoriesByMenu });
  } else {
    const categories = await categoryRepository.find();

    if (categories) {
      return res.status(200).json({ message: "Success", data: categories });
    } else {
      return res.status(404).json({ message: "Category not found" });
    }
  }
};

export {
  addMenu,
  getMenu,
  getMenuByCategories,
  getMenuByCategory,
  getSingleMeal,
};
