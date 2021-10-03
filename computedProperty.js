function computed(getter) {
  let result = ref();

  effect(() => (result.value = getter()));

  return result;
};


let product = reactive({ price: 10, quantity: 5 });

let salePrice = computed(() => product.price * 0.9);

let total = computed(() => salePrice.value * product.quantity)