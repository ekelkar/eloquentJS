// Create an object for an error. This object is not given any properties
function MultiplicationUnitFailure() {
}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5) {
    return a * b;
  } else {
   throw new MultiplicationUnitFailure();
  }
}

function reliableMultiply(a, b) {
  var tries = 1;
  for (;;) {
    try {
      var result = primitiveMultiply(a, b);
      break;
    } catch (error) {
      if (error instanceof MultiplicationUnitFailure) {
        console.log("Failed " + tries + " times");
        console.log("Try again");
        tries += 1;
      } else {
        console.log(error);
        throw error;
      }
    }
  }
  return result;
}

console.log(reliableMultiply(8, 8));