let product = reactive({ price: 5, quantity: 10 });
let total = 0;
let activeEffect = null;

function effect(eff) {
  activeEffect = eff;
  activeEffect();
  activeEffect = null;
}

effect(() => {
  total = product.price * product.quantity;
});

const targetMap = new WeakMap();


function track(target, key) {
  if (activeEffect) {
    let depMaps = targetMap.get(target);
    if (!depMaps) {
      targetMap.set(target, (depMaps = new Map()));
    }
    let dep = depMaps.get(key);
    if (!dep) {
      depMaps.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
  }

};

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

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      console.log(`A ${target} was called with key ${key}`);
      track(target, key);
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      let oldValue = target[key];
      console.log(`A set was called with value ${value} and key ${key}`);
      const result = Reflect.set(target, key, value, receiver);
      if (result && oldValue !== value) {
        trigger(target, key);
      }
      return result;
    }
  }
  return new Proxy(target, handler);
}

effect();
product.quantity =30;
console.log(product.quantity);
