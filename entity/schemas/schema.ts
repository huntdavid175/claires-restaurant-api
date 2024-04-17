import { z } from "zod";

export const MenuSchema = z.object({
  food_name: z
    .string({
      required_error: "Name of food required",
      invalid_type_error: "Food name must be a string",
    })
    .trim()
    .min(1, "Food name cannot be empty"),
  description: z
    .string({
      required_error: "Food description is required",
      invalid_type_error: "Description must be a string",
    })
    .trim()
    .min(1, "Description cannot me empty"),
  category: z.string({
    required_error: "Category required",
    invalid_type_error: "Category must be a string",
  }),
});

export const CategorySchema = z.object({
  name: z
    .string({ required_error: "Category name required" })
    .trim()
    .min(1, "Category name cannot be empty"),
});

export const OrderSchema = z.object({
  productId: z.number({
    required_error: "Product id required",
    invalid_type_error: "Product id must be a number",
  }),
  quantity: z.number({
    required_error: "Quantity required",
    invalid_type_error: "Quantity must be a number",
  }),
  address: z
    .string({
      required_error: "Address required",
      invalid_type_error: "Address must be a string",
    })
    .trim()
    .min(1, "Address cannot be empty"),
  phone: z
    .string({
      required_error: "Phone number required",
      invalid_type_error: "Phone number must be a string",
    })
    .trim()
    .min(1, "Phone number cannot be empty"),
  size: z.enum(["small", "medium", "large", "extralarge"], {
    errorMap: (issue, ctx) => {
      return { message: "Invalid size" };
    },
  }),
  provider: z.enum(["MTN", "VODAFONE", "AIRTELTIG0"], {
    errorMap: (issue, ctx) => {
      return { message: "Invalid provider" };
    },
  }),
});

export type Menu = z.infer<typeof MenuSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Order = z.infer<typeof OrderSchema>;
