let product = {
  quantity: 2,
  price: 5
};

let total = 0;

let effect = () => {
  total = product.price * product.quantity;
}

const depMaps = new Map();

function track(key) {
  let dep = depMaps.get(key);
  if (!dep) {
    depMaps.set(key, (dep = new Set()));
  }
  dep.add(effect);
}

function trigger(key) {
  let dep = depMaps.get(key);
  if (dep) {
    dep.forEach(effect => {
      effect();
    });
  }
};

track('quantity');
effect();
console.log(total);

product.price = 10;
trigger('quantity');
console.log(total);