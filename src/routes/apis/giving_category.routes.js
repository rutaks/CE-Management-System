import Router from "express";
import givingCategoryController from "../../controllers/apis/giving_category.controller";

const router = Router();

router.post("/", givingCategoryController.createGivingCategory);
router.get("/", givingCategoryController.getGivingCategories);

export default router;
