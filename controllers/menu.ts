import { Request, Response } from "express";
import { Menu } from "../entity/menu";
import { Price } from "../entity/price";
import { Category } from "../entity/category";
import { AppDataSource } from "../data-source";

// Get all menu items
const getMenu = async (req: Request, res: Response) => {
  const menuRepository = AppDataSource.getRepository(Menu);
  const allMenu = await menuRepository.find({
    relations: { price: true, category: true },
  });
  console.log(allMenu);
  res.status(200).json({ data: allMenu });
};

// Get by all categories
const getMenuByCategories = async (req: Request, res: Response) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categoriesByMenu = await categoryRepository.find({
    relations: { menus: true },
  });

  res.status(200).json({ data: categoriesByMenu });
};

// Add a menu item
const addMenu = async (req: Request, res: Response) => {
  const { food_name, description, category, small, medium, large, extraLarge } =
    req.body;

  // create new menu
  const menu = new Menu();
  menu.food_name = food_name;
  menu.description = description;

  // create new menu-price
  const price = new Price();
  price.small = small;
  price.medium = medium;
  price.large = large;
  price.extralarge = extraLarge;
  price.menu = menu;

  menu.price = price;

  const menuRepository = AppDataSource.getRepository(Menu);

  // Find if a category exists
  const categoryRepository = AppDataSource.getRepository(Category);

  const categoryExists = await categoryRepository.findOne({
    where: { name: category },
  });

  // Add menu to category if category already exists
  if (categoryExists) {
    menu.category = categoryExists;
    const responseMenu = await menuRepository.save(menu);
    const result = await menuRepository.findOne({
      where: { id: responseMenu.id },
      relations: { price: true, category: true },
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
      relations: { price: true, category: true },
    });
    res.status(201).json({ data: { result } });
  }
};

export { addMenu, getMenu, getMenuByCategories };
