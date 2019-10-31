import Fellowship from "../../models/fellowship.model";
import Responses from "../../helpers/responses";

class fellowshipController {
  static createFellowship(req, res) {
    let { name } = req.body;
    Fellowship.findOne({ name: name }).then(fellowship => {
      if (fellowship) {
        Responses.send409(res, "The Fellowship already exist");
      } else {
        const fellowship = new Fellowship({ name: name });
        fellowship
          .save()
          .then(result => {
            return Responses.send201(res, "Fellowship Successfully Created", {
              fellowship: fellowship.name,
              createdOn: fellowship.createdOn
            });
          })
          .catch(err => {
            return Responses.send404(res, err);
          });
      }
    });
  }

  static getFellowships(req, res) {
    Fellowship.find().then(fellowships => {
      return Responses.send201(res, "Success", fellowships);
    });
  }
}

export default fellowshipController;
