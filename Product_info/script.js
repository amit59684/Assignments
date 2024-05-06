const fs = require('fs');

function readJSONFromFile(filename) {
  const rawData = fs.readFileSync(filename);
  return JSON.parse(rawData);
}

function averageDiscountPerBrand(data) {
  const discounts = {};
  data.forEach(product => {
    if (product.brand in discounts) {
      discounts[product.brand].push(product.discount || 0);
    } else {
      discounts[product.brand] = [product.discount || 0];
    }
  });
  const averages = {};
  Object.keys(discounts).forEach(brand => {
    const sum = discounts[brand].reduce((acc, val) => acc + val, 0);
    averages[brand] = sum / discounts[brand].length;
  });
  return averages;
}

function oldestPhoneModelWithAndroidOS(data) {
  const androidPhones = data.filter(product => product.os.includes('Android'));
  const oldestPhone = androidPhones.reduce((oldest, current) => {
    return oldest.release_date < current.release_date ? oldest : current;
  });
  return oldestPhone.model;
}

function priceAfterDiscount(data) {
  return data.map(product => {
    const discountedPrice = product.price * (1 - (product.discount || 0));
    return { model: product.model, discountedPrice };
  });
}

function totalPriceReleasedAfterYear(data, year) {
  return data
    .filter(product => product.release_data > year)
    .reduce((total, product) => total + product.price, 0);
}

function mostExpensiveBrand(data) {
  const brands = {};
  data.forEach(product => {
    if (product.brand in brands) {
      brands[product.brand].push(product.price);
    } else {
      brands[product.brand] = [product.price];
    }
  });
  const averages = {};
  Object.keys(brands).forEach(brand => {
    const sum = brands[brand].reduce((acc, val) => acc + val, 0);
    averages[brand] = sum / brands[brand].length;
  });
  const mostExpensive = Object.keys(averages).reduce((a, b) => (averages[a] > averages[b] ? a : b));
  return mostExpensive;
}

const productsData = readJSONFromFile('products.json');

console.log("Avarage Discount of Brand",averageDiscountPerBrand(productsData));
console.log("Oldest Phone With Android",oldestPhoneModelWithAndroidOS(productsData));
console.log("Discounted Price",priceAfterDiscount(productsData));
console.log("Total Price of Phones Released After 2000",totalPriceReleasedAfterYear(productsData, 2000));
console.log("Most Expensive Brand",mostExpensiveBrand(productsData));
