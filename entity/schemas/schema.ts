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

export type Menu = z.infer<typeof MenuSchema>;
