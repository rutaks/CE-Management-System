class calculator {
  static findTotal(array) {
    let tot = 0;
    array.forEach(element => {
      tot += element.amount;
    });
    return tot;
  }
}

export default calculator;
