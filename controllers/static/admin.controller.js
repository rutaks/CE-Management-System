class adminController {
  static getMainView(req, res) {
    res.status(201).render("auth/login");
  }
}

export default adminController;
