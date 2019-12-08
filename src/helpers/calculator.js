class calculator {
  static findTotal(array, currency) {
    let usdTot = 0;
    let rwfTot = 0;
    let usdArray = array.filter(element => element.currency === "USD");
    let rwfArray = array.filter(element => element.currency === "RWF");

    if (currency == "USD") {
      usdArray.forEach(element => {
        usdTot += element.amount;
      });
      rwfTot = 0;
    } else if (currency == "RWF") {
      rwfArray.forEach(element => {
        rwfTot += element.amount;
      });
      usdTot = 0;
    } else {
      rwfArray.forEach(element => {
        rwfTot += element.amount;
      });
      usdArray.forEach(element => {
        usdTot += element.amount;
      });
    }

    return { usdTot, rwfTot };
  }
}

export default calculator;
