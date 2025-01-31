export function FilterProducts(products, filters) {
  const filterKeys = Object.keys(filters);
  let filteredProducts = products;
  for (let i = 0; i < filterKeys.length; i++) {
    switch (filterKeys[i]) {
      case "selPriceRange":
        filteredProducts = filteredProducts.filter(
          (product) =>
            filters[filterKeys[i]][0] < product.price &&
            product.price < filters[filterKeys[i]][1]
        );
        break;
      case "rating":
        filteredProducts = filteredProducts.filter(
          (product) => product.rating >= filters[filterKeys[i]]
        );
        break;
      case "discount":
        filteredProducts = filteredProducts.filter(
          (product) => product.discountPercentage >= filters[filterKeys[i]]
        );
        break;
      case "selBrands":
        if (filters[filterKeys[i]].length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            filters[filterKeys[i]].includes(product.brand)
          );
        }
        break;
      case "selCategories":
        if (filters[filterKeys[i]].length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            filters[filterKeys[i]].includes(product.category)
          );
        }
        break;
      default:
        break;
    }
  }
  return filteredProducts;
}
