let price = 5;
let quantity = 2;
let total = 0;

let dep = new Set(); // To store our effects

let effect = function () {
  total = price * quantity;
}

function track() {
  dep.add(effect); // Adding the code in deps
}

function trigger() {
  dep.forEach(effect => {  // Trigger the code again when any value changes
    effect();
  });
}
track();
effect();

console.log(`total is ${total}`);

price = 20;

trigger();

console.log(`total is ${total}`);