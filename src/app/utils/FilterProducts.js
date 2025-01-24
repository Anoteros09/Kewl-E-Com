export function FilterProducts(products, filters) {
  console.log(filters);
  console.log(products);
  const filterKeys = Object.keys(filters);
  let filteredProducts = products;
  for (let i = 0; i < filterKeys.length; i++) {
    console.log("start loop " + filteredProducts.length);

    switch (filterKeys[i]) {
      case "selPriceRange":
        console.log("filtering by price range " + filters[filterKeys[i]]);
        filteredProducts = filteredProducts.filter(
          (product) =>
            filters[filterKeys[i]][0] < product.price &&
            product.price < filters[filterKeys[i]][1]
        );
        break;
      case "rating":
        console.log("filtering by rating " + filters[filterKeys[i]]);
        filteredProducts = filteredProducts.filter(
          (product) => product.rating >= filters[filterKeys[i]]
        );
        break;
      case "discount":
        console.log("filtering by discount " + filters[filterKeys[i]]);
        filteredProducts = filteredProducts.filter(
          (product) => product.discountPercentage >= filters[filterKeys[i]]
        );
        break;
      case "selBrands":
        console.log("filtering by brands " + filters[filterKeys[i]]);
        if (filters[filterKeys[i]].length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            filters[filterKeys[i]].includes(product.brand)
          );
        }
        break;
      case "selCategories":
        console.log("filtering by categories " + filters[filterKeys[i]]);
        if (filters[filterKeys[i]].length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            filters[filterKeys[i]].includes(product.category)
          );
        }
        break;
      default:
        break;
    }
    console.log("end loop " + filteredProducts.length);
  }
  console.log(filteredProducts.length);
  return filteredProducts;
}
