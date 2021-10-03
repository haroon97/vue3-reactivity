let product = {
  price: 5,
  quantity: 10
};

// There are three ways to print out property on an object
console.log('quantity is ', product.quantity); // Dot notation

console.log('quantity is ', product["quantity"]);

console.log('quantity is ', Reflect.get(product, 'quantity'));