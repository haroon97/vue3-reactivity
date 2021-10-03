let product = {
  quantity: 2,
  price: 5
};

let user = {
  firstName: 'Haroon',
  lastName: 'Ahmed'
};

let total = 0;

let effect = () => {
  total = product.price * product.quantity;
}

const targetMap = new WeakMap();

function track(target, key) {
  let depMaps = targetMap.get(target);
  if (!depMaps) {
    targetMap.set(target, (depMaps = new Map()));
  }
  let dep = depMaps.get(key);
  if (!dep) {
    depMaps.set(key, (dep = new Set()));
  }
  dep.add(effect);
}

function trigger(target, key) {
  const depMaps = targetMap.get(target);
  if (!depMaps) {
    return;
  }
  let dep = depMaps.get(key);
  if (dep) {
    dep.forEach(effect => {
      effect();
    });
  }
};

track(product, 'quantity');
effect();
console.log(total);

product.price = 10;
trigger(product, 'quantity');
console.log(total);