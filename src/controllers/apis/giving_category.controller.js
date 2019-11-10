import GivingCategory from "../../models/giving_category.model";
import Responses from "../../helpers/responses";

class givingCategoryController {
  static createGivingCategory(req, res) {
    let { name } = req.body;
    GivingCategory.findOne({ name: name }).then(givingCategory => {
      if (!givingCategory) {
        const giving = new GivingCategory({ name: name });
        giving
          .save()
          .then(result => {
            return Responses.send201(
              res,
              "Giving Category Successfully Created",
              {
                giving: giving.name,
                createdOn: giving.createdOn
              }
            );
          })
          .catch(err => {
            return Responses.send404(res, err);
          });
      }
    });
  }
  static getGivingCategories(req, res) {
    GivingCategory.find().then(givingCategory => {
      return Responses.send201(res, "Success", givingCategory);
    });
  }
}

export default givingCategoryController;
