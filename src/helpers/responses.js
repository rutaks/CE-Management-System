class responses {
  static send201(res, msg, data) {
    res.status(201).json({
      status: 201,
      msg: msg,
      data: data
    });
  }

  static send409(res, msg) {
    res.status(409).json({
      status: 409,
      error: msg
    });
  }

  static send404(res, error) {
    res.status(404).json({
      status: 404,
      error: error
    });
  }
}

export default responses;
