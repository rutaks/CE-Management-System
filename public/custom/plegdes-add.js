let rad = document.partnership.currency;
let field = document.getElementById("currencyRateField");
field.style.visibility = "hidden";
var prev = null;
for (var i = 0; i < rad.length; i++) {
  rad[i].onclick = function() {
    prev ? console.log(prev.value) : null;
    if (this !== prev) {
      prev = this;
    }
    if (this.value === "USD") {
      field.style.visibility = "visible";
    }
    if (this.value === "RWF") {
      field.style.visibility = "hidden";
    }
  };
}
