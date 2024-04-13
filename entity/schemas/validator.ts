import { validate } from "../../middlewares/validate";
import { CategorySchema, MenuSchema, OrderSchema } from "./schema";

export const ValidateMenuCreate = validate(MenuSchema);
export const ValidateCategoryCreate = validate(CategorySchema);
export const ValidateOrderCreate = validate(OrderSchema);
