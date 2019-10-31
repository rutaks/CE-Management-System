class adminController {
  static getMainView(req, res) {
    res.status(201).render("admin/index");
  }
}

export default adminController;
