function cube(x) {
  let result = 9;
  console.log(x);
  function mul(y) {
    return result**2;
  }
  return mul(x);
}

let outNum = 2;
console.log(cube(outNum));