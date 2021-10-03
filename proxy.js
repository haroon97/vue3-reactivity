

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      console.log(`A ${target} was called with key ${key}`);
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      console.log(`A set was called with value ${value} and key ${key}`);
      return Reflect.set(target, key, value, receiver)
    }
  }
  return new Proxy(target, handler);
}

let product = reactive({ price: 5, quantity: 10 });
product.quantity =20;
console.log(product.quantity);