import { validate } from "../../middlewares/validate";
import { MenuSchema } from "./schema";

export const ValidateMenuCreate = validate(MenuSchema);
